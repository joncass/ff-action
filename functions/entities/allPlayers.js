const nflAPI = require('../api/nfl')

nflAPI.getAllPlayerNames().then(names => {
  names.forEach(name => console.log(`"${name}","${name}"`))
})