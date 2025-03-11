const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((v) => v.trim());

const n = Number(input[0]);
const info = input.slice(1).map((v) => v.split(" ").map(Number));
info.sort((a, b) => a[0] - b[0]);
const arr = [];
info.forEach((v) => {
  [_, b] = v;
  arr.push(b);
});

// LCS 문제와 같아졌다.

const dp = Array.from({ length: arr.length }).fill(1);

for (let i = 1; i < arr.length; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[j] < arr[i]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}

console.log(n - Math.max(...dp));
