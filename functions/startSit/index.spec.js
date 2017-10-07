const startSit = require('./index')

describe('startSit', () => {
  it('should ...', () => {
    expect.assertions(1)
    return startSit.decision({
      players: ['Aaron Rodgers', `Aaron Rodgers`],
    }).then(decision => {
      console.log(decision)
      expect(1).toBe(1)
    })
  })
})