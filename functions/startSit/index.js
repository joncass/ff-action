const nflAPI = require('../api/nfl')
const result = require('./result')

const decision = ({
  players,
}) => {
  const promise = new Promise((resolve, reject) => {
    const playerProjectionPromises = Promise.all(
      players.map(playerName => nflAPI.getPlayerProjection({ playerName }))
    )

    playerProjectionPromises.then(projections => {
      const decisionResult = result.constructResult([
        {
          name: players[0],
          projection: projections[0],
        },
        {
          name: players[1],
          projection: projections[1],
        },
      ])
      resolve(decisionResult)
    }).catch(error => {
      reject(error)
    })
  })

  return promise
}

module.exports = {
  decision,
}