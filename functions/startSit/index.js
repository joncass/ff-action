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
      resolve(result.constructResult(
        [0, 1].map(index => ({
          name: players[index],
          projection: projections[index],
        }))
      ))
    })
  })

  return promise
}

module.exports = {
  decision,
}