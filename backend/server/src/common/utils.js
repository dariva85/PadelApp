function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

module.exports = {
  getRandomInt,
  pad,
};
