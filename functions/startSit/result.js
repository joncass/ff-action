const _randomElement = arr => (arr[Math.floor(Math.random()*arr.length)])

const BENEDICTIONS = [
  `Good luck!`,
  `Best of luck!`,
  `You'll do great!`,
  `You're going to crush it.`,
  `May the fantasy be ever in your favor.`,
  `Hope you win!`,
]

// playerProjections should be an array of length two where each element
// looks like { name: PLAYER_NAME, projection: PROJECTION }
const constructResult = (playerProjections) => {
  playerProjections.sort(function (a, b) {
    return a.projection - b.projection;
  })
  if (playerProjections[1].projection === 0) {
    return `I wouldn't start ${playerProjections[0].name} or ${playerProjections[1].name} - I have them each projected to get 0 points.`
  }

  const coeff = playerProjections[0].projection / playerProjections[1].projection
  const worsePlayer = playerProjections[0].name
  const betterPlayer = playerProjections[1].name

  let result
  if (coeff <= .5) {
    result = `That's an easy one. I have ${betterPlayer} way ahead of ${worsePlayer}.`
  }
  else if (coeff <= .9) {
    result = `I recommend ${betterPlayer} over ${worsePlayer}.`
  }
  else if  (coeff < 1) {
    result = `I'd go with ${betterPlayer}, but ${worsePlayer} is close.`
  }
  else {
    result = `I can't decide. Go with your gut.`
  }

  const benediction = _randomElement(BENEDICTIONS)

  return `${result} ${benediction}`
}

module.exports = {
  constructResult,
}