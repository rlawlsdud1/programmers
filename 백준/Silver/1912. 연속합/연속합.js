const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

const n = Number(input[0]);
const numbers = input[1].split(" ").map(Number);
// 연속된 몇개의 수를 선택해서 구할 수 있는 합 중 가장 큰 합을 구하려고 한다
// 단 수는 한 개 이상 선택해야 한다
// dp[i] 는 i번째를 선택했을 때 i번째를 마지막으로 하는 부분수열의 합의 최댓값
// dp[i] = Math.max(dp[i-1]+numbers[i], numbers[i])
// 커지면 포함하고, 아니라면 새로 시작

const dp = Array.from({ length: n }).fill(0);
dp[0] = numbers[0];

for (let i = 1; i < n; i++) {
  dp[i] = Math.max(dp[i - 1] + numbers[i], numbers[i]);
}
console.log(Math.max(...dp));
