import { ActionConfig } from './types'

const shellac = require('shellac').default

export class Cloudflare {
  private readonly apiToken: string
  private readonly accountId: string
  private readonly projectName: string
  private readonly coverageLocation: string

  constructor(config: ActionConfig) {
    this.apiToken = config.cloudflare.apiToken
    this.accountId = config.cloudflare.accountId
    this.projectName = config.cloudflare.project
    this.coverageLocation = config.test.coverage.location
  }

  async publish(commitSha: string) {
    const { output } = await shellac`
        $ export CLOUDFLARE_API_TOKEN="${this.apiToken}"
        $ export CLOUDFLARE_ACCOUNT_ID="${this.accountId}"
        $$ npx wrangler@3 pages deploy "${this.coverageLocation}" --project-name="${this.projectName}" --branch="${commitSha}"
        stdout >> output
`
    return output
  }
}

export default Cloudflare
