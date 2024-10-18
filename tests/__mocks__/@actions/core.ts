export const getInput = jest.fn((name: string) => {
  if (name === 'github-token') return 'github-token'
  if (name === 'test-command') return 'npx jest --coverage --json'
  if (name === 'coverage-location') return 'coverage-location'
  if (name === 'base-coverage-branch') return 'base-coverage-branch'
  if (name === 'cloudflare-account-id') return 'cloudflare-account-id'
  if (name === 'cloudflare-api-token') return 'cloudflare-api-token'
  if (name === 'cloudflare-project-name') return 'cloudflare-project-name'

  throw new Error('Unknown input')
})

export const setFailed = jest.fn(error => {
  console.error(error)
})
