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

const [N, M] = input[0].split(" ").map(Number);
const heights = input[1].split(" ").map(Number);
const info = input.slice(2, 2 + M).map((v) => v.split(" ").map(Number));

const diff = Array.from({ length: N + 1 }).fill(0);

for (let i = 0; i < M; i++) {
  const [a, b, k] = info[i];
  diff[a - 1] += k;
  diff[b] -= k;
}

let current = 0;
for (let i = 0; i < N; i++) {
  current += diff[i];
  heights[i] += current;
}

console.log(heights.join(" "));
