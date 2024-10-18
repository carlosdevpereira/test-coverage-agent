describe('src/config.ts', () => {
  it.todo('exports getConfig function')

  describe('getConfig', () => {
    describe('when called with all required inputs', () => {
      it.todo('returns a valid config object')
    })

    describe.each([
      'github-token',
      'test-command',
      'coverage-location',
      'base-coverage-branch',
      'cloudflare-account-id',
      'cloudflare-api-token',
      'cloudflare-project-name'
    ])('when called without %s', inputName => {
      // beforeEach(() => {
      // jest.spyOn(core, 'getInput').mockImplementation((name: string) => {
      //   if (name === inputName) return ''
      //   return 'valid-input-value'
      // })
      // })

      //   afterEach(() => {
      //     jest.spyOn(core, 'getInput').mockImplementation(getInputFnMock)
      //   })

      it.todo(`throws missing ${inputName} error`)
    })
  })
})
