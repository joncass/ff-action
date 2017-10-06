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

const getAllPositionRankings = Promise.all(
  ['QB', 'RB', 'WR', 'TE'].map(position => getPositionRankings({ position }))
)

module.exports = {
  getPositionRankings,
  getAllPositionRankings,
}