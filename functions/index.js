'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');
const startSit = require('./startSit')

exports.ffAction = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  // c. The function that generates a decision
  function startSitDecision (app) {
    const firstPlayer = app.getArgument('football-player');
    const secondPlayer = app.getArgument('football-player1');

    return startSit.decision({
      players: [firstPlayer, secondPlayer],
    }).then(decision => {
      app.tell(decision)
    }).catch(error => {
      app.tell(`Sorry. Something went wrong: ${error}`)
    })
  }

  // d. build an action map, which maps intent names to functions
  const actionMap = new Map();
  actionMap.set('two_players', startSitDecision);


  app.handleRequest(actionMap);
});