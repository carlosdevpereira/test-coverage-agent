import pullRequestSynchronizeEventFixture from '@tests/__fixtures__/github/events/pull-request-synchronize.json'

export const context = pullRequestSynchronizeEventFixture

export function getOctokit() {
  return {
    rest: {}
  }
}
