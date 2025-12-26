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

const [N, M] = input[0].split(" ").map(Number);
const info = input.slice(1, 1 + N).map(Number);
const total = info.reduce((acc, cur) => acc + cur, 0);

let answer = Infinity;
let left = Math.max(...info);
let right = total;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  let count = 1;
  let cur = mid;
  info.forEach((v) => {
    if (cur - v < 0) {
      cur = mid;
      count++;
    }

    cur -= v;
  });

  if (count > M) {
    left = mid + 1;
  } else {
    right = mid - 1;
    answer = Math.min(answer, mid);
  }
}

console.log(answer);
