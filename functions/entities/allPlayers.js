const nflAPI = require('../api/nfl')

nflAPI.getAllPlayerNames().then(names => {
  names.forEach(name => {
    const strippedName = name.replace(/[^\w\s]/g, '')
    console.log(`"${name}","${name}"`)
    if (strippedName !== name) {
      console.log(`"${strippedName}","${strippedName}"`)
    }
  })
})