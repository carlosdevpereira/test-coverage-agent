import * as core from '@actions/core'

import getConfig from './config'
import { Handler as PushFlow } from './flows/push'
import { Handler as PrFlow } from './flows/pull-request'

export async function run(): Promise<void> {
  try {
    core.debug('Retrieving action config...')
    const config = getConfig()

    core.debug('Starting flow handler...')
    if (config.github.trigger.event === 'push') return PushFlow(config)
    if (config.github.trigger.event === 'pull_request') return PrFlow(config)

    core.debug(
      'Skipping workflow. Trigger event was not "push" or "pull_request".'
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
