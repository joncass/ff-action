const nflAPI = require('./nfl')
const fetch = require('./fetch')

const mockPromise = new Promise((resolve, reject) => {
  process.nextTick(
    () => resolve([
      {
        id: 1,
        name: "First Player",
        weekProjectedPts: 5.1,
      },
      {
        id: 2,
        name: "Second Player",
        weekProjectedPts: 6.2,
      },
      {
        id: 3,
        name: "Third Player",
        weekProjectedPts: 7.3,
      },
      {
        id: 4,
        name: "Fourth Player",
        weekProjectedPts: 8.4,
      },
    ])
  )
})
fetch.fetchData = () => mockPromise

describe('nflAPI.getAllPlayerNames', () => {
  it(`should return an array of players' names`, () => {
    expect.assertions(1)
    return nflAPI.getAllPlayerNames().then(names => {
      expect(names).toEqual([
        `First Player`,
        `Second Player`,
        `Third Player`,
        `Fourth Player`,
       ])
     })
  })
})

describe('nflAPI.getPlayerProjections', () => {
  it(`should return projections for the desired players`, () => {
    expect.assertions(2)

    return nflAPI.getPlayerProjections({
      players: [
        'Third Player',
        'First Player',
      ]
    }).then(projections => {
      expect(projections).toEqual([
        7.3,
        5.1,
      ])

      return nflAPI.getPlayerProjections({
        players: [
          'Second Player',
          'Fourth Player',
        ]
      }).then(projections => {
        expect(projections).toEqual([
          6.2,
          8.4,
        ])
      })
    })
  })

  it(`should reject if the player is not found`, () => {
    expect.assertions(1)

    return nflAPI.getPlayerProjections({
      players: [
        'Fifth Player',
      ]
    }).catch(error => {
      expect(error).toEqual(`Player Fifth Player not found`)
    })
  })
})