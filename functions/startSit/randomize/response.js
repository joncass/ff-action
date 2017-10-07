const randomizeUtil = require('./util')

exports.blowOut = (bP, wP) => {
  return randomizeUtil.element([
    `That's an easy one. I have ${bP} way ahead of ${wP}.`,
    `No brainer. Start ${bP} and sit ${wP}.`,
    `${bP} should easily outperform ${wP}.`,
    `${bP} is the way to go here. Don't even consider ${wP}.`,
  ])
}

exports.recommend = (bP, wP) => {
  return randomizeUtil.element([
    `I recommend ${bP} over ${wP}.`,
    `I would definitely go with ${bP} over ${wP}.`,
    `I have ${bP} over ${wP} by a fair amount.`,
    `Start ${bP} over ${wP} with confidence.`,
  ])
}

exports.suggest = (bP, wP) => {
  return randomizeUtil.element([
    `I'd go with ${bP}, but ${wP} is close.`,
    `That's a pretty close one, but ${bP} should be better than ${wP}`,
    `Tough one, but I have to play ${bP} over ${wP}.`,
    `I suggest ${bP} ahead of ${wP}, but not by a lot.`,
  ])
}

exports.slight = (bP, wP) => {
  return randomizeUtil.element([
    `${bP} has the slight edge, but ${wP} could be just as good.`,
    `I'd play ${bP} above ${wP}, but it's very tight.`,
    `I have ${bP} ahead of ${wP}, but by a very narrow margin`,
    `If I have to pick, it's ${bP}. But ${wP} might be right there with him.`,
  ])
}
