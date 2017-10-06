const rankings = require('../data/rankings')

const printAllPlayers = () => {
  rankings.getAllPositionRankings.then(positionalRankingSet => {
    positionalRankingSet.forEach(positionalRankings => {
      positionalRankings.forEach(player => {
        console.log(`"${player.firstName} ${player.lastName}","${player.firstName} ${player.lastName}"`)
      })
    })
  })
}

printAllPlayers()
