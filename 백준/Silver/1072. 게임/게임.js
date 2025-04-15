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

let [X, Y] = input[0].split(" ").map(Number);
let left = 0,
  right = 1_000_000_000;

const Z = Math.floor((Y * 100) / X);

while (left <= right) {
  if (X === Y || Z === 99) break;

  const mid = Math.floor((left + right) / 2);

  let temp_X = X + mid;
  let temp_Y = Y + mid;

  if (Math.floor((temp_Y * 100) / temp_X) >= Z + 1) {
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log(left ? left : -1);
