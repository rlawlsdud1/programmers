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
const info = input.slice(1, 1 + M).map((v) => v.split(" ").map(Number));

const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: N + 1 }).fill(undefined)
);

info.forEach((v) => {
  const [a, b] = v;

  dp[a][b] = -1;
  dp[b][a] = 1;
});

for (let i = 1; i <= N; i++) dp[i][i] = 0;

for (let k = 1; k <= N; k++) {
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      if (i !== j) {
        if (dp[i][k] === -1 && dp[k][j] === -1) {
          dp[i][j] = -1;
          dp[j][i] = 1;
        }
      }
    }
  }
}

let answer = 0;

dp.forEach((row) => {
  const slicedRow = row.slice(1);
  if (!slicedRow.some((v) => v === undefined)) answer++;
});

console.log(answer);
