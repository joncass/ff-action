const startSit = require('./index')

describe('startSit', () => {
  it('should ...', () => {
    expect.assertions(1)
    return startSit.decision({
      players: ['Chris Hogan', `Ameer Abdullah`],
    }).then(decision => {
      console.log(decision)
      expect(1).toBe(1)
    })
  })
})