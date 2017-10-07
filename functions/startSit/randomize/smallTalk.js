const randomizeUtil = require('./util')

exports.benediction = () => randomizeUtil.element([
  `Good luck!`,
  `Best of luck!`,
  `You'll do great!`,
  `You're going to crush it.`,
  `May the fantasy be ever in your favor.`,
  `Hope you win!`,
])