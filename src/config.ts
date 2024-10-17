import * as core from '@actions/core'
import * as github from '@actions/github'

export function getConfig() {
  /** Retrieve required inputs */
  const githubToken = core.getInput('github-token')
  if (!githubToken) throw new Error('Missing input github-token')
  const accountId = core.getInput('cloudflare-account-id')
  if (!accountId) throw new Error('Missing input cloudflare-account-id')
  const cloudflareApiToken = core.getInput('cloudflare-api-token')
  if (!cloudflareApiToken) throw new Error('Missing input cloudflare-api-token')
  const cloudflareProjectName = core.getInput('cloudflare-project-name')
  if (!cloudflareProjectName) throw new Error('Missing input cloudflare-project-name')

  return {
    github: {
      token: githubToken
    },
    cloudflare: {
      accountId,
      apiToken: cloudflareApiToken,
      project: cloudflareProjectName
    }
  }
}

export default getConfig
