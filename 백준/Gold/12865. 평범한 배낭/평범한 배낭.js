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

const [N, K] = input[0].split(" ").map(Number);
const info = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: K + 1 }).fill(0)
);

for (let i = 1; i <= N; i++) {
  // 현재 관찰 중인 물건 정보
  const [currentWeight, currentValue] = info[i - 1];

  for (let w = 1; w <= K; w++) {
    // 지금 보고 있는 물건을 담을 수 있다면
    if (w - currentWeight >= 0) {
      dp[i][w] = Math.max(
        dp[i - 1][w],
        dp[i - 1][w - currentWeight] + currentValue
      );
    } else {
      // 담을 수 없다면
      dp[i][w] = dp[i - 1][w];
    }
  }
}
console.log(Math.max(...dp[N]));
