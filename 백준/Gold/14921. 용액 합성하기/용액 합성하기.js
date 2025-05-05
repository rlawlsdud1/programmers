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
info.sort((a, b) => a - b);
// Ai-1 ≤ Ai 라서 정렬하고 시작할 필요 없다

let answer = Infinity;
let left = 0,
  right = N - 1;

while (left < right) {
  const sum = info[left] + info[right];

  if (Math.abs(answer) > Math.abs(sum)) {
    answer = sum;
  }

  if (sum > 0) {
    right--;
  } else if (sum < 0) {
    left++;
  } else {
    answer = 0;
    break;
  }
}

console.log(answer);
