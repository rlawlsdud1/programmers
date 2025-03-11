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

const [n, k] = input[0].split(" ").map(Number);
let coins = input.slice(1).map(Number);
const coinSet = new Set();
coins.forEach((v) => {
  coinSet.add(v);
});
coins = [...coinSet];

const dp = Array.from({ length: k + 1 }).fill(Infinity);
dp[0] = 0;

for (let i = 1; i <= k; i++) {
  for (const coin of coins) {
    if (i - coin >= 0) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
}
if (dp[k] !== Infinity) console.log(dp[k]);
else console.log(-1);
