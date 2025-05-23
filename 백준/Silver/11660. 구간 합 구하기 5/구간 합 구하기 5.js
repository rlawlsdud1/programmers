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
const map = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
const info = input.slice(1 + N, 1 + N + M).map((v) => v.split(" ").map(Number));

const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: N + 1 }).fill(0)
);

dp[1][1] = map[0][0];
for (let j = 2; j <= N; j++) {
  dp[1][j] = map[0][j - 1] + dp[1][j - 1];
}

for (let i = 2; i <= N; i++) {
  dp[i][1] = map[i - 1][0] + dp[i - 1][1];
}

for (let i = 2; i <= N; i++) {
  for (let j = 2; j <= N; j++) {
    dp[i][j] =
      dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1] + map[i - 1][j - 1];
  }
}

info.forEach((v) => {
  const [x1, y1, x2, y2] = v;

  const answer =
    dp[x2][y2] - dp[x2][y1 - 1] - dp[x1 - 1][y2] + dp[x1 - 1][y1 - 1];

  console.log(answer);
});
