import * as core from '@actions/core'
import * as github from '@actions/github'
import getConfig from './config'

export async function run(): Promise<void> {
  try {
    core.debug('Retrieving action config...')
    const config = getConfig()

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
