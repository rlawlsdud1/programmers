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
const triangle = input
  .slice(1, 1 + n)
  .map((v) => v.split(" ").map(Number))
  .reverse();

for (let i = 1; i < n; i++) {
  for (let j = 0; j < n - i; j++) {
    triangle[i][j] += Math.max(triangle[i - 1][j], triangle[i - 1][j + 1]);
  }
}

console.log(triangle[n - 1][0]);
