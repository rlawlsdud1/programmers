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

const n = Number(input[0]);
const info = input.slice(1, 1 + n).map(Number);
if (n === 1) {
  console.log(info[0]);
  process.exit(0);
}

const dp = Array.from({ length: n }, () => [0, 0, 0]);
dp[0][1] = info[0];
dp[0][2] = info[0];

dp[1][0] = info[0];
dp[1][1] = info[1];
dp[1][2] = info[0] + info[1];

for (let i = 2; i < n; i++) {
  dp[i][0] = Math.max(...dp[i - 1]);
  dp[i][1] = dp[i - 1][0] + info[i];
  dp[i][2] = dp[i - 1][1] + info[i];
}
console.log(Math.max(...dp[n - 1]));
