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

const A = input[0];
const B = input[1];

const n = A.length;
const m = B.length;

const dp = Array.from({ length: n }, () => Array.from({ length: m }).fill(0));

dp[0][0] = A[0] === B[0] ? 1 : 0;

for (let i = 1; i < n; i++) {
  if (A[i] === B[0]) {
    dp[i][0] = 1;
  } else {
    dp[i][0] = dp[i - 1][0];
  }
}

for (let j = 1; j < m; j++) {
  if (B[j] === A[0]) {
    dp[0][j] = 1;
  } else {
    dp[0][j] = dp[0][j - 1];
  }
}

for (let i = 1; i < n; i++) {
  const watchingElement = A[i];
  for (let j = 1; j < m; j++) {
    if (watchingElement === B[j]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
    }
  }
}

console.log(dp[n - 1][m - 1]);
