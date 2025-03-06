const fs = require("fs");
// 제출할때는 '/dev/stdin' 로 바꾸기
let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map((v) => v.trim());

const N = Number(input[0]);

// dp[i]는 i를 만들기 위한 최소 연산 횟수
const dp = Array.from({ length: N + 1 }).fill(Infinity);

// 1은 연산이 필요 없음
dp[1] = 0;

for (let i = 2; i <= N; i++) {
  if (i % 3 === 0) dp[i] = Math.min(dp[i / 3] + 1, dp[i]);
  if (i % 2 === 0) dp[i] = Math.min(dp[i / 2] + 1, dp[i]);
  dp[i] = Math.min(dp[i - 1] + 1, dp[i]);
}
console.log(dp[N]);
