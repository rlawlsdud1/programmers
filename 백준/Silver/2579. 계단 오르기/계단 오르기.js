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
  process.exit();
}
const dp = Array.from({ length: n }, () => [0, 0]);
// dp의 각 원소의
// 첫번째 원소는 한 칸 올라왔을 때 최대
// 두번째 원소는 두 칸 올라왔을 때 최대

dp[0][0] = info[0];
dp[0][1] = 0;

dp[1][0] = info[0] + info[1];
dp[1][1] = info[1];

for (let i = 2; i < n; i++) {
  dp[i][0] = dp[i - 1][1] + info[i];
  dp[i][1] = Math.max(dp[i - 2][0], dp[i - 2][1]) + info[i];
}

console.log(Math.max(...dp[n - 1]));
