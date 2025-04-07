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

const sum = info.reduce((acc, cur) => acc + cur, 0);
let right = Math.floor(sum / N);
let left = 0;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  let count = 0;

  info.forEach((v) => {
    count += Math.floor(v / mid);
  });

  if (count >= N) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(right);
