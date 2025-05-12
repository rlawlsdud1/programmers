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
const info = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));

const dp = Array.from({ length: N + 2 }).fill(0);
let answer = 0;

// 역방향으로 DP table 채우기
for (let i = N; i >= 1; i--) {
  const [T, P] = info[i - 1];

  // 여기에 걸리면, 일단 선택할 수 있는 상황
  if (i + T - 1 <= N) {
    dp[i] = Math.max(P + dp[i + T], dp[i + 1]);
  } else {
    dp[i] = dp[i + 1];
  }

  answer = Math.max(answer, dp[i]);
}

console.log(answer);
