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
const info = input[1].split(" ").map(Number);

const differences = [];
for (let i = 0; i < N - 1; i++) {
  differences[i] = info[i + 1] - info[i];
}

differences.sort((a, b) => a - b);
console.log(differences.slice(0, N - K).reduce((acc, cur) => acc + cur, 0));
