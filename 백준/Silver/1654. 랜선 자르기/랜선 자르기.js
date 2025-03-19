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

const [K, N] = input[0].split(" ").map(Number);
const info = input.slice(1, 1 + K).map(Number);
const target = N - K;
let left = 0;
let right = Math.floor(info.reduce((acc, cur) => acc + cur, 0) / N);
let answer = 0;
while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  let sum = 0;
  info.forEach((v) => {
    sum += Math.floor(v / mid);
  });

  if (sum >= N) {
    left = mid + 1;
    answer = Math.max(answer, mid);
  } else {
    right = mid - 1;
  }
}

console.log(answer);
