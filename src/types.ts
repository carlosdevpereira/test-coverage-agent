export interface CloudflareResponse {
  success: boolean
  errors: any[]
  messages: any[]
  result: {
    id: string
    short_id: string
    project_id: string
    project_name: string
    environment: string
    url: string
    created_on: string
    modified_on: string
    deployment_trigger: {
      type: string
      metadata: {
        branch: string
        commit_hash: string
        commit_message: string
        commit_dirty: boolean
      }
    }
  }
}
