const http = require('http')

const getPositionRankings = ({
  position,
}) => {
  const promise = new Promise((resolve, reject) => {
    http.get('http://api.fantasy.nfl.com/v1/players/editorweekranks?position=' + position + '&format=json&count=1000', response => {

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

const printAllPlayers = () => {
  const getAllPositionRankings = Promise.all(
    ['QB', 'RB', 'WR', 'TE'].map(position => getPositionRankings({ position }))
  )
  getAllPositionRankings.then(positionalRankingSet => {
    positionalRankingSet.forEach(positionalRankings => {
      positionalRankings.forEach(player => {
        console.log(`"${player.firstName} ${player.lastName}","${player.firstName} ${player.lastName}"`)
      })
    })
  })
}

printAllPlayers()