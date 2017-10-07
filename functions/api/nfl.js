const fetch = require('./fetch')

const DATA_STORE = {}

const getAllPlayerNames = () => {
  const promise = new Promise((resolve, reject) => {
    fetch.fetchData().then(statPlayers => {
      resolve(
        statPlayers.map(player => player.name)
      )
    })
  })

  return promise
}

const _fillDataStore = () => {
  return fetch.fetchData().then(statPlayers => {
    statPlayers.forEach(player => {
      DATA_STORE[player.name] = player.weekProjectedPts
    })
  })
}

const getPlayerProjection = ({
  playerName,
}) => {
  const promise = new Promise((resolve, reject) => {
    if (playerName in DATA_STORE) {
      resolve(DATA_STORE[playerName])
    }
    else {
      _fillDataStore().then(() => {
        if (playerName in DATA_STORE) {
          resolve(DATA_STORE[playerName])
        }
        else {
          reject(`Player ${playerName} not found`)
        }
      })
    }
  })

  return promise
}

const getPlayerProjections = ({
  players,
}) => {
  return Promise.all(
    players.map(playerName => getPlayerProjection({ playerName }))
  )
}

module.exports = {
  getAllPlayerNames,
  getPlayerProjections,
}