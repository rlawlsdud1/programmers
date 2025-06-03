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
const info = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
info.sort((a, b) => a[0] - b[0]);
const infoObj = {};
info.forEach((v) => {
  const [x, y] = v;
  infoObj[x] = y;
});

const start = info[0][0];
const end = info[N - 1][0];
let leftToRight = [];
let rightToLeft = [];

leftToRight[start] = info[0][1];
let cur = info[0][1];
for (let i = start + 1; i <= end; i++) {
  if (infoObj[i]) {
    if (infoObj[i] > cur) cur = infoObj[i];
    leftToRight[i] = cur;
  } else {
    leftToRight[i] = cur;
  }
}
leftToRight = leftToRight.slice(start);

rightToLeft[end] = info[N - 1][1];
cur = info[N - 1][1];
for (let i = end - 1; i >= start; i--) {
  if (infoObj[i]) {
    if (infoObj[i] > cur) cur = infoObj[i];
    rightToLeft[i] = cur;
  } else {
    rightToLeft[i] = cur;
  }
}
rightToLeft = rightToLeft.slice(start);

let answer = 0;
for (let i = 0; i <= end - start; i++) {
  answer += Math.min(rightToLeft[i], leftToRight[i]);
}
console.log(answer);
