import type { ActionConfig } from '@/types'

import * as github from '@actions/github'
import * as core from '@actions/core'
import Cloudflare from '@/cloudflare'
import { readFileSync } from 'fs'

const shellac = require('shellac').default

export async function Handler(config: ActionConfig) {
  core.debug('Pull request flow handler started...')
  if (!github.context.payload.pull_request) {
    throw new Error('Missing pull request context')
  }

  const octokit = github.getOctokit(config.github.token)
  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: github.context.payload.pull_request.number
  })

  if (pullRequest.merged) return await MergeFlowHandler(config)
  if (pullRequest.state === 'open') {
    const validActions = ['opened', 'synchronize']
    const triggerAction = config.github.trigger.action || ''
    if (!validActions.includes(triggerAction)) {
      const msg = 'Skipping workflow as trigger action was: ' + triggerAction
      return core.debug(msg)
    }

    return await SyncFlowHandler(config)
  }
}

async function MergeFlowHandler(config: ActionConfig) {
  // check if coverage comment exists in the pull request,
  // if not, skips the workflow
  // if yes, retrieves the comment, extracts updated coverage values from it, and uploads to the production environment of Cloudflare pages project
}

async function SyncFlowHandler(config: ActionConfig) {
  core.debug('Sync flow handler started...')

  core.debug('Executing test command: ' + config.test.command)
  const { testOutputs } = await shellac`
        ${config.test.command}
        stdout >> testOutputs
`
  core.debug('Test outputs: ' + testOutputs)

  const cloudflareClient = new Cloudflare(config)
  await cloudflareClient.publish(config.github.commit.shortSha)

  const testResults = await parseTestResults(
    config.test.coverage.location,
    JSON.parse(testOutputs)
  )
  core.info('Test results: ' + JSON.stringify(testResults))

  // generates a comment string based on the test results
  // creates a new PR comment or updates the existing one
}

async function parseTestResults(coverageLocation: string, testResults: any) {
  const coverageSummary = JSON.parse(
    readFileSync(`${coverageLocation}/coverage-summary.json`, 'utf-8')
  )

  const finalPercentage = Math.floor(
    [
      coverageSummary.total.lines.pct,
      coverageSummary.total.statements.pct,
      coverageSummary.total.functions.pct,
      coverageSummary.total.branches.pct
    ].reduce((a, b) => {
      return a + b
    }, 0) / 4
  )

  const reportSummary = {
    statements: {
      total: coverageSummary.total.statements.total,
      covered: coverageSummary.total.statements.covered,
      skipped: coverageSummary.total.statements.skipped,
      percentage: coverageSummary.total.statements.pct
    },
    lines: {
      total: coverageSummary.total.lines.total,
      covered: coverageSummary.total.lines.covered,
      skipped: coverageSummary.total.lines.skipped,
      percentage: coverageSummary.total.lines.pct
    },
    functions: {
      total: coverageSummary.total.functions.total,
      covered: coverageSummary.total.functions.covered,
      skipped: coverageSummary.total.functions.skipped,
      percentage: coverageSummary.total.functions.pct
    },
    branches: {
      total: coverageSummary.total.branches.total,
      covered: coverageSummary.total.branches.covered,
      skipped: coverageSummary.total.branches.skipped,
      percentage: coverageSummary.total.branches.pct
    }
  }

  const results = {
    startTime: testResults.startTime,
    endTime:
      testResults.testResults[testResults.testResults.length - 1].endTime,
    testSuites: {
      total: testResults.numTotalTestSuites,
      passed: testResults.numPassedTestSuites,
      failed: testResults.numFailedTestSuites
    },
    tests: {
      total: testResults.numTotalTests,
      passed: testResults.numPassedTests,
      failed: testResults.numFailedTests
    },
    snapshots: {
      total: testResults.snapshot.total
    }
  }

  return {
    results,
    coverage: {
      percentage: finalPercentage,
      summary: reportSummary
    }
  }
}

export default Handler
