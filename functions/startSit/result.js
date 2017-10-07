const randomize = require('./randomize')

// playerProjections should be an array of length two where each element
// looks like { name: PLAYER_NAME, projection: PROJECTION }
const constructResult = (playerProjections) => {
  playerProjections.sort(function (a, b) {
    return a.projection - b.projection;
  })

  // If the max is 0, short-circuit
  if (playerProjections[1].projection === 0) {
    return `I wouldn't start ${playerProjections[0].name} or ${playerProjections[1].name} - I have them each projected to get 0 points.`
  }

  const coefficient = playerProjections[0].projection / playerProjections[1].projection
  const worsePlayer = playerProjections[0].name
  const betterPlayer = playerProjections[1].name
  return randomize.response({
    betterPlayer,
    worsePlayer,
    coefficient,
  })
}

module.exports = {
  constructResult,
}