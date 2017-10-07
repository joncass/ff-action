const _randomElement = arr => (arr[Math.floor(Math.random()*arr.length)])

const COEFFICIENTS = {
  BLOW_OUT: .5,
  RECOMMEND: .8,
  SUGGEST: .95,
  SLIGHT: 1,
}

const possibleResponses = {
  [COEFFICIENTS.BLOW_OUT]: (bP, wP) => {
    return _randomElement([
      `That's an easy one. I have ${bP} way ahead of ${wP}.`,
    ])
  },
  [COEFFICIENTS.RECOMMEND]: (bP, wP) => {
    return _randomElement([
      `I recommend ${bP} over ${wP}.`,
    ])
  },
  [COEFFICIENTS.SUGGEST]: (bP, wP) => {
    return _randomElement([
      `I'd go with ${bP}, but ${wP} is close.`,
    ])
  },
  [COEFFICIENTS.SLIGHT]: (bP, wP) => {
    return _randomElement([
      `${bP} has the slight edge, but ${wP} could be just as good.`,
    ])
  },
}

const BENEDICTIONS = [
  `Good luck!`,
  `Best of luck!`,
  `You'll do great!`,
  `You're going to crush it.`,
  `May the fantasy be ever in your favor.`,
  `Hope you win!`,
]

const coefficientCeiling = (coefficient) => {
  let ceiling

  if (coefficient <= COEFFICIENTS.BLOW_OUT) {
    ceiling = COEFFICIENTS.BLOW_OUT
  }
  else if (coefficient <= COEFFICIENTS.RECOMMEND) {
    ceiling = COEFFICIENTS.RECOMMEND
  }
  else if (coefficient <= COEFFICIENTS.SUGGEST) {
    ceiling = COEFFICIENTS.SUGGEST
  }
  else {
    ceiling = COEFFICIENTS.SLIGHT
  }

  return ceiling
}

const response = ({
  betterPlayer,
  worsePlayer,
  coefficient,
}) => {
  const ceiling = coefficientCeiling(coefficient)
  const randomResponse = possibleResponses[ceiling](betterPlayer, worsePlayer)

  const benediction = _randomElement(BENEDICTIONS)

  return `${randomResponse} ${benediction}`
}

module.exports = {
  response,
}