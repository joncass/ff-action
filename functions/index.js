'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');
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

const getPlayerRankings = ({
  firstPlayer,
  secondPlayer,
}) => {
  const promise = new Promise((resolve, reject) => {
    const getAllPositionRankings = Promise.all(
      ['QB', 'RB', 'WR', 'TE'].map(position => getPositionRankings({ position }))
    )
    getAllPositionRankings.then(positionalRankingSet => {
      let dataByName
      const foundRankings = positionalRankingSet.find(positionalRankings => {
        dataByName = {}
        positionalRankings.forEach(player => {
          dataByName[`${player.firstName} ${player.lastName}`.toLowerCase()] = player
        })
        return (dataByName[firstPlayer] && dataByName[secondPlayer])
      })

      if (foundRankings) {
        const resolution = {}
        resolution[firstPlayer] = dataByName[firstPlayer].rank
        resolution[secondPlayer] = dataByName[secondPlayer].rank

        resolve(resolution)
      }
      else {
        reject(`Couldn't find rankings at the same position for ${firstPlayer} and ${secondPlayer}`)
      }
    }).catch(error => {
      reject(error)
    })
  })

  return promise
}

const BENEDICTIONS = [
  `Good luck!`,
  `Best of luck!`,
  `You'll do great!`,
  `You're going to crush it.`,
  `May the fantasy be ever in your favor.`,
  `Hope you win!`,
]
const _randomElement = arr => (arr[Math.floor(Math.random()*arr.length)])

const constructResult = (rankings) => {
  const players = Object.keys(rankings)
  const firstPlayer = players[0]
  const secondPlayer = players[1]
  let result
  if (rankings[firstPlayer] <= .5 * rankings[secondPlayer]) {
    result = `Definitely ${firstPlayer}. Not even close.`
  }
  else if (rankings[firstPlayer] > .5 * rankings[secondPlayer] && rankings[firstPlayer] <= .9 * rankings[secondPlayer]) {
    result = `I recommend ${firstPlayer}.`
  }
  else if  (rankings[firstPlayer] > .9 * rankings[secondPlayer] && rankings[firstPlayer] < rankings[secondPlayer]) {
    result = `That's a tough one, but I'd go with ${firstPlayer}.`
  }
  else if (rankings[secondPlayer] <= .5 * rankings[firstPlayer]) {
    result = `Definitely ${secondPlayer}. Not even close.`
  }
  else if (rankings[secondPlayer] > .5 * rankings[firstPlayer] && rankings[secondPlayer] <= .9 * rankings[firstPlayer]) {
    result = `I recommend ${secondPlayer}.`
  }
  else if  (rankings[secondPlayer] > .9 * rankings[firstPlayer] && rankings[secondPlayer] < rankings[firstPlayer]) {
    result = `That's a tough one, but I'd go with ${secondPlayer}.`
  }
  else {
    result = `I can't decide. Go with your gut.`
  }

  const benediction = _randomElement(BENEDICTIONS)

  return `${result} ${benediction}`
}

exports.ffAction = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));


  // c. The function that generates a decision
  function startSitDecision (app) {
    const firstPlayer = app.getArgument('football-player').toLowerCase();
    const secondPlayer = app.getArgument('football-player1').toLowerCase();

    return getPlayerRankings({
      firstPlayer,
      secondPlayer,
    }).then(rankings => {
      const result = constructResult(rankings)
      app.tell(result)
    }).catch(error => {
      app.tell(`Sorry. Something went wrong: ${error}`)
    })
  }

  // d. build an action map, which maps intent names to functions
  const actionMap = new Map();
  actionMap.set('two_players', startSitDecision);


  app.handleRequest(actionMap);
});