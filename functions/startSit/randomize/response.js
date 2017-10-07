const randomizeUtil = require('./util')

exports.blowOut = (bP, wP) => {
  return randomizeUtil.element([
    `That's an easy one. I have ${bP} way ahead of ${wP}.`,
  ])
}

exports.recommend = (bP, wP) => {
  return randomizeUtil.element([
    `I recommend ${bP} over ${wP}.`,
  ])
}

exports.suggest = (bP, wP) => {
  return randomizeUtil.element([
    `I'd go with ${bP}, but ${wP} is close.`,
  ])
}

exports.slight = (bP, wP) => {
  return randomizeUtil.element([
    `${bP} has the slight edge, but ${wP} could be just as good.`,
  ])
}
