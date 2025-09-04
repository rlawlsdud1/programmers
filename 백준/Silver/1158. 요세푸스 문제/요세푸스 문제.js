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

const [N, K] = input[0].split(" ").map(Number);

const queue = Array.from({ length: N }).map((_, i) => i + 1);
const answer = [];

while (queue.length) {
  let count = 1;

  while (count < K) {
    queue.push(queue.shift());
    count++;
  }

  answer.push(queue.shift());
}

console.log("<" + answer.join(", ") + ">");
