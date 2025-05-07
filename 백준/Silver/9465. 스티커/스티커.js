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

const T = Number(input[0]);
const info = input.slice(1);
let idx = 0;
for (let i = 0; i < T; i++) {
  const n = Number(info[idx++]);
  const map = info.slice(idx, idx + 2).map((v) => v.split(" ").map(Number));
  const dp = Array.from({ length: n }, () => [0, 0, 0]);
  // 각 원소의
  // 첫번째 원소는 i 번째 안뜯을 떄 최댓값
  // 두번째 원소는 i 번째의 위를 뜯을 때 최댓값
  // 세번째 원소는 i 번째의 아래를 뜯을 때 최댓값

  dp[0][1] = map[0][0];
  dp[0][2] = map[1][0];

  for (let j = 1; j < n; j++) {
    dp[j][0] = Math.max(...dp[j - 1]);
    dp[j][1] = Math.max(dp[j - 1][0], dp[j - 1][2]) + map[0][j];
    dp[j][2] = Math.max(dp[j - 1][0], dp[j - 1][1]) + map[1][j];
  }

  console.log(Math.max(...dp[n - 1]));

  idx += 2;
}
