const fs = require("fs");
const { arch } = require("os");
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

let card = Array.from({ length: N }).map((_, i) => N - i);

let isThrowTurn = true;

while (card.length > 1) {
  const queue = [];

  while (card.length) {
    if (isThrowTurn) {
      card.pop();
    } else {
      queue.push(card.pop());
    }
    isThrowTurn = !isThrowTurn;
  }

  card = queue.reverse();
}

console.log(card[0]);
