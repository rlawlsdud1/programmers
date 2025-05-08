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
const info = input[1].split(" ").map(Number);
const reversedInfo = [...info].reverse();

const dpToRight = Array.from({ length: N }).fill(1); // LCS
const dpToLeft = Array.from({ length: N }).fill(1); // LDS

for (let i = 1; i < N; i++) {
  for (j = 0; j < i; j++) {
    if (info[i] > info[j]) {
      dpToRight[i] = Math.max(dpToRight[i], dpToRight[j] + 1);
    }
  }
}

for (let i = 1; i < N; i++) {
  for (j = 0; j < i; j++) {
    if (reversedInfo[i] > reversedInfo[j]) {
      dpToLeft[i] = Math.max(dpToLeft[i], dpToLeft[j] + 1);
    }
  }
}
dpToLeft.reverse();

const answer = [];
for (let i = 0; i < N; i++) {
  answer[i] = dpToLeft[i] + dpToRight[i];
}
console.log(Math.max(...answer) - 1);
