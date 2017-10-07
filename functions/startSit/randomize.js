const randomizeResponse = require('./randomize/response')
const randomizeSmallTalk = require('./randomize/smallTalk')

const COEFFICIENTS = {
  BLOW_OUT: .5,
  RECOMMEND: .8,
  SUGGEST: .95,
  SLIGHT: 1,
}

const possibleResponses = {
  [COEFFICIENTS.BLOW_OUT]: randomizeResponse.blowOut,
  [COEFFICIENTS.RECOMMEND]: randomizeResponse.recommend,
  [COEFFICIENTS.SUGGEST]: randomizeResponse.suggest,
  [COEFFICIENTS.SLIGHT]: randomizeResponse.slight,
}

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
  const benediction = randomizeSmallTalk.benediction()

  return `${randomResponse} ${benediction}`
}

module.exports = {
  response,
}