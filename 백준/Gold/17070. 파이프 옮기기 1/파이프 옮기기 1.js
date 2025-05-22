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
const map = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));

const dp = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => [0, 0, 0])
);
// 초깃값 세팅

dp[0][1][0] = 1; // 초기 상태

// 1행 체크
for (let j = 2; j < N; j++) {
  if (map[0][j] !== 1) dp[0][j][0] = 1;
  else break;
}

for (let i = 1; i < N; i++) {
  for (let j = 2; j < N; j++) {
    if (map[i][j] !== 1) {
      // 가로로 들어올 때
      dp[i][j][0] += dp[i][j - 1][0] + dp[i][j - 1][2];

      // 세로로 들어올 때
      dp[i][j][1] += dp[i - 1][j][1] + dp[i - 1][j][2];

      // 대각으로 들어올 때
      if (map[i - 1][j] !== 1 && map[i][j - 1] !== 1) {
        dp[i][j][2] +=
          dp[i - 1][j - 1][0] + dp[i - 1][j - 1][1] + dp[i - 1][j - 1][2];
      }
    }
  }
}

console.log(dp[N - 1][N - 1].reduce((acc, cur) => acc + cur, 0));
