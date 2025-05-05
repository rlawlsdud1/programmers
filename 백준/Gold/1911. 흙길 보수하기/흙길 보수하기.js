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

const [N, L] = input[0].split(" ").map(Number);
const info = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
info.sort((a, b) => {
  if (a[0] === b[0]) return a[1] - b[1];
  return a[0] - b[0];
});

let start = info[0][0];
let count = 0;

for (let i = 0; i < N; i++) {
  // 시작위치 조정 ( greedy )
  if (start < info[i][0]) {
    start = info[i][0];
  }

  while (start < info[i][1]) {
    count++;
    start += L;
  }
}

console.log(count);
