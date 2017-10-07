const startSit = require('./index')

const nflAPI = require('../api/nfl')
const result = require('./result')

describe('startSit.decision', () => {
  it('should call the API and construct a result', () => {
    const mockAPI = jest.fn()
    nflAPI.getPlayerProjections = mockAPI
    mockAPI.mockReturnValue(
      new Promise((resolve, reject) => {
        process.nextTick(
          () => resolve([10.1, 12.2]),
        )
      })
    )

    const mockConstructResult = jest.fn()
    result.constructResult = mockConstructResult
    mockConstructResult.mockReturnValue(`Decision`)

    expect.assertions(5)

    expect(mockAPI).not.toHaveBeenCalled()
    expect(mockConstructResult).not.toHaveBeenCalled()
    return startSit.decision({
      players: [`First Player`, `Second Player`],
    }).then(decision => {
      expect(mockAPI).toHaveBeenCalledWith({
        players: [`First Player`, `Second Player`],
      })
      expect(mockConstructResult).toHaveBeenCalledWith([
        {
          name: `First Player`,
          projection: 10.1,
        },
        {
          name: `Second Player`,
          projection: 12.2,
        },
      ])
      expect(decision).toBe(`Decision`)
    })
  })

  it('should reject with an error if the API throws', () => {
    nflAPI.getPlayerProjections = () => new Promise((resolve, reject) => {
      throw new Error(`API Error`)
    })

    expect.assertions(1)
    return startSit.decision({
      players: [`First Player`, `Second Player`],
    }).catch(error => {
      expect(error).toEqual(Error(`API Error`))
    })
  })
})