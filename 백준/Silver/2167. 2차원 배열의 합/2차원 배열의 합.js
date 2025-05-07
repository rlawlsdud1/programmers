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
const matrix = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
const K = Number(input[1 + N]);
const testcases = input.slice(2 + N).map((v) => v.split(" ").map(Number));

const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: M + 1 }).fill(0)
);

dp[1][1] = matrix[0][0];

// 1행 미리 채우기 (initial value setup)
for (let j = 2; j <= M; j++) {
  dp[1][j] = dp[1][j - 1] + matrix[0][j - 1];
}

// 마찬가지로 1열 미리 채우기
for (let i = 1; i <= N; i++) {
  dp[i][1] = dp[i - 1][1] + matrix[i - 1][0];
}

for (let i = 2; i <= N; i++) {
  for (let j = 2; j <= M; j++) {
    dp[i][j] =
      dp[i][j - 1] + dp[i - 1][j] + matrix[i - 1][j - 1] - dp[i - 1][j - 1];
  }
}

// dp[i][j]는 (1, 1) 부터 (i, j) 까지 긁어 모은 원소들의 합이다
// 이제 이를 이용해서 구하고자 하는 값을 구해보자

for (let idx = 0; idx < K; idx++) {
  const [i, j, x, y] = testcases[idx];
  const answer = dp[x][y] - dp[x][j - 1] - dp[i - 1][y] + dp[i - 1][j - 1];
  console.log(answer);
}
