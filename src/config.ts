import * as core from '@actions/core'
import * as github from '@actions/github'
import { ActionConfig } from './types'

export function getConfig() {
  /** Retrieve required inputs */
  const githubToken = core.getInput('github-token')
  if (!githubToken) throw new Error('Missing input github-token')
  const testCommand = core.getInput('test-command')
  if (!testCommand) throw new Error('Missing input test-command')
  const coverageLocation = core.getInput('coverage-location')
  if (!coverageLocation) throw new Error('Missing input coverage-location')
  const baseBranch = core.getInput('base-coverage-branch')
  if (!baseBranch) throw new Error('Missing input base-coverage-branch')
  const accountId = core.getInput('cloudflare-account-id')
  if (!accountId) throw new Error('Missing input cloudflare-account-id')
  const cloudflareApiToken = core.getInput('cloudflare-api-token')
  if (!cloudflareApiToken) throw new Error('Missing input cloudflare-api-token')
  const cloudflareProjectName = core.getInput('cloudflare-project-name')
  if (!cloudflareProjectName)
    throw new Error('Missing input cloudflare-project-name')

  return {
    test: {
      command: testCommand,
      coverage: {
        location: coverageLocation,
        baseBranch
      }
    },
    github: {
      token: githubToken,
      commit: {
        sha: github.context.sha,
        shortSha: github.context.sha.slice(0, 7),
      },
      trigger: {
        event: github.context.eventName,
        action: github.context.payload.action,
      }
    },
    cloudflare: {
      accountId,
      apiToken: cloudflareApiToken,
      project: cloudflareProjectName
    }
  } as ActionConfig
}

export default getConfig
