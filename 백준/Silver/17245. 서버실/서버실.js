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

let sum = 0,
  left = 0,
  right = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    sum += info[i][j];
    right = Math.max(right, info[i][j]);
  }
}

const target = Math.ceil(sum / 2);

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  const count = getCount(mid);

  if (count >= target) {
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log(left);

function getCount(m) {
  let sum = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      sum += Math.min(m, info[i][j]);
    }
  }

  return sum;
}
