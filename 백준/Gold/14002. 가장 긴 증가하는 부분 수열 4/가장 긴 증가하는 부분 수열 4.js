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
const numbers = input[1].split(" ").map(Number);

const dp = Array.from({ length: N }, (_, i) => [numbers[i]]);

for (let i = 1; i < N; i++) {
  const cur = numbers[i];

  for (let j = 0; j < i; j++) {
    if (cur > numbers[j]) {
      if (dp[j].length + 1 > dp[i].length) {
        dp[i] = [...dp[j], cur];
      }
    }
  }
}

let maxLength = 0,
  idx;

for (let i = 0; i < N; i++) {
  if (dp[i].length > maxLength) {
    maxLength = dp[i].length;
    idx = i;
  }
}

console.log(maxLength);
console.log(dp[idx].join(" "));
