const http = require('http')

const DATA_STORE = {}

const getStatPlayers = () => {
  const promise = new Promise((resolve, reject) => {
    http.get('http://api.fantasy.nfl.com/v1/players/stats', response => {

      let rawData = ''
      response.on('data', chunk => {
        rawData += chunk
      })

      response.on('end', () => {
        const parsedData = JSON.parse(rawData)
        resolve(parsedData.players)
      })
    })
  })

  return promise
}

const getAllPlayerNames = () => {
  const promise = new Promise((resolve, reject) => {
    getStatPlayers().then(statPlayers => {
      resolve(
        statPlayers.map(player => player.name)
      )
    })
  })

  return promise
}

const _fillDataStore = () => {
  return getStatPlayers().then(statPlayers => {
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

module.exports = {
  getAllPlayerNames,
  getPlayerProjection,
}