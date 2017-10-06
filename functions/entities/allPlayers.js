const rankingsAPI = require('../api/rankings')

const printAllPlayers = () => {
  rankingsAPI.getAllPositionRankings.then(positionalRankingSet => {
    positionalRankingSet.forEach(positionalRankings => {
      positionalRankings.forEach(player => {
        console.log(`"${player.firstName} ${player.lastName}","${player.firstName} ${player.lastName}"`)
      })
    })
  })
}

printAllPlayers()
