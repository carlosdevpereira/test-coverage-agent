export interface ActionConfig {
  test: {
    command: string
    coverage: {
      location: string
      baseBranch: string
    }
  }
  github: {
    token: string
    commit: {
      sha: string
      shortSha: string
    }
    trigger: {
      event: string
      action?: string
    }
  }
  cloudflare: {
    accountId: string
    apiToken: string
    project: string
  }
}
