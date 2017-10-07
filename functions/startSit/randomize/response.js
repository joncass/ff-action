const randomize = require('./index')

exports.blowOut = (bP, wP) => {
  return randomize.element([
    `That's an easy one. I have ${bP} way ahead of ${wP}.`,
  ])
}

exports.recommend = (bP, wP) => {
  return randomize.element([
    `I recommend ${bP} over ${wP}.`,
  ])
}

exports.suggest = (bP, wP) => {
  return randomize.element([
    `I'd go with ${bP}, but ${wP} is close.`,
  ])
}

exports.slight = (bP, wP) => {
  return randomize.element([
    `${bP} has the slight edge, but ${wP} could be just as good.`,
  ])
}
