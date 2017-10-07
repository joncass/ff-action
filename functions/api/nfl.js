const fetch = require('./fetch')

const DATA_STORE = {}

const normalizeString = str => str.replace(/[^\w]/g, '').toLowerCase()

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
      DATA_STORE[normalizeString(player.name)] = player.weekProjectedPts
    })
  })
}

const getPlayerProjection = ({
  playerName,
}) => {
  const promise = new Promise((resolve, reject) => {
    const normPlayerName = normalizeString(playerName)
    if (normPlayerName in DATA_STORE) {
      resolve(DATA_STORE[normPlayerName])
    }
    else {
      _fillDataStore().then(() => {
        if (normPlayerName in DATA_STORE) {
          resolve(DATA_STORE[normPlayerName])
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