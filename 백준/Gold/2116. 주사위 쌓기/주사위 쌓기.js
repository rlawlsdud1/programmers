const { kMaxLength } = require("buffer");
const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
const input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((v) => v.trim());

const N = Number(input[0]);
const info = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));

const pair = [
  [0, 5],
  [2, 4],
  [1, 3],
];
const pairInfo = {};

pair.forEach(([a, b]) => {
  pairInfo[a] = b;
  pairInfo[b] = a;
});

let answer = 0;
let answerCandidate = 0;

let firstDice = info[0];
for (let bottomIdx = 0; bottomIdx <= 5; bottomIdx++) {
  findMaxValue(firstDice, 0, firstDice[bottomIdx]);

  answer = Math.max(answer, answerCandidate);

  answerCandidate = 0;
}
console.log(answer);

function findMaxValue(dice, index, bottomValue) {
  if (index >= N) return;
  const bottomValueIdx = dice.indexOf(bottomValue);
  const counterPartIdx = pairInfo[bottomValueIdx];
  const nextValue = dice[counterPartIdx];

  let maxValue = 0;
  for (let i = 0; i < 6; i++) {
    if (i === bottomValueIdx || i === counterPartIdx) continue;
    maxValue = Math.max(maxValue, dice[i]);
  }

  const nextDice = info[index + 1];
  answerCandidate += maxValue;
  findMaxValue(nextDice, index + 1, nextValue);
}
