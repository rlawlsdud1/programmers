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

// 각 위치에서 왼쪽에서 가장 높은 기둥, 오른쪽에서 가장 높은 기둥을 담은 배열 구하기
const [H, W] = input[0].split(" ").map(Number);
const heights = input[1].split(" ").map(Number);

const left = Array.from({ length: W }).fill(0);
const right = Array.from({ length: W }).fill(0);

left[0] = heights[0];
right[W - 1] = heights[W - 1];

for (let i = 1; i < W; i++) {
  left[i] = Math.max(left[i - 1], heights[i]);
}

for (let i = W - 2; i >= 0; i--) {
  right[i] = Math.max(right[i + 1], heights[i]);
}

let count = 0;

for (let i = 0; i < W; i++) {
  count += Math.min(left[i], right[i]) - heights[i];
}
console.log(count);
