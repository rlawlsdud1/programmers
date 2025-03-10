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

const [N, K] = input[0].split(" ").map(Number);
const info = input.slice(1).map((v) => v.split(" ").map(Number));

const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: K + 1 }).fill(0)
);

for (let i = 1; i <= N; i++) {
  const currentObject = info[i - 1];
  for (let w = 1; w <= K; w++) {
    if (w - currentObject[0] >= 0) {
      dp[i][w] = Math.max(
        dp[i - 1][w],
        dp[i - 1][w - currentObject[0]] + currentObject[1]
      );
    } else {
      dp[i][w] = dp[i - 1][w];
    }
  }
}
console.log(Math.max(...dp[N]));
