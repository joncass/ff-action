const http = require('http')

const fetchData = () => {
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
