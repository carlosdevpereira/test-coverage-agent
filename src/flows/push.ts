import type { ActionConfig } from "@/types";

export async function Handler(config: ActionConfig) {
  // runs the test command,
  // compares with the base coverage,
  // generates a comment string
  // logs the comment to the console
  // if the push event was to the main branch, uploads to the production environment of Cloudflare pages project
}

export default Handler
