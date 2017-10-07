const randomizeResponse = require('./randomize/response')
const randomizeSmallTalk = require('./randomize/smallTalk')

const COEFFICIENTS = {
  BLOW_OUT: .5,
  RECOMMEND: .8,
  SUGGEST: .95,
  SLIGHT: 1,
}

const response = ({
  betterPlayer,
  worsePlayer,
  coefficient,
}) => {
  let randomResponseFn

  if (coefficient <= COEFFICIENTS.BLOW_OUT) {
    randomResponseFn = randomizeResponse.blowOut
  }
  else if (coefficient <= COEFFICIENTS.RECOMMEND) {
    randomResponseFn = randomizeResponse.recommend
  }
  else if (coefficient <= COEFFICIENTS.SUGGEST) {
    randomResponseFn = randomizeResponse.suggest
  }
  else {
    randomResponseFn = randomizeResponse.slight
  }

  const randomResponse = randomResponseFn(betterPlayer, worsePlayer)
  const benediction = randomizeSmallTalk.benediction()

  return `${randomResponse} ${benediction}`
}

module.exports = {
  response,
}