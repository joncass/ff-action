const smallTalk = require('./smallTalk')

describe('smallTalk.benediction', () => {
  it('should return a string', () => {
    expect(
      typeof smallTalk.benediction()
    ).toBe('string')
  })
})