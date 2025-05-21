const fs = require("fs");
const { loadavg } = require("os");
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

const [N, M, B] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
let minTime = Infinity;
let maxHeight = 0;

for (let h = 0; h <= 256; h++) {
  let time = 0;
  let blockCnt = B;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const diff = h - map[i][j];
      if (diff > 0) time += diff;
      else if (diff < 0) time += -diff * 2;

      blockCnt -= diff;
    }
  }

  if (blockCnt >= 0) {
    minTime = Math.min(time, minTime);
    if (minTime === time) maxHeight = Math.max(maxHeight, h);
  }
}

console.log(minTime, maxHeight);
