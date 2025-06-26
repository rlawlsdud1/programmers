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
const abilitiesOfH = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const abilitiesOfA = input[2]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function upperBS(target, arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

function lowerBS(target, arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

let winCntOfH = 0;
let winCntOfA = 0;
let draw = 0;

for (let i = 0; i < N; i++) {
  const cur = abilitiesOfH[i];
  const upper = upperBS(cur, abilitiesOfA);
  const lower = lowerBS(cur, abilitiesOfA);

  winCntOfH += lower;
  draw += upper - lower;
}

for (let i = 0; i < M; i++) {
  const cur = abilitiesOfA[i];
  const upper = upperBS(cur, abilitiesOfH);
  const lower = lowerBS(cur, abilitiesOfH);

  winCntOfA += lower;
  // draw += upper - lower; 비긴건 한쪽에서만 처리
}

console.log(winCntOfH, winCntOfA, draw);
