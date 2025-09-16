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

let left = 0,
  right = N - 1;
let answer = Math.min(info[left], info[right]) * (right - left - 1);

while (left < right) {
  const betweenCnt = right - left - 1;
  answer = Math.max(answer, Math.min(info[left], info[right]) * betweenCnt);

  if (info[right] > info[left]) left++;
  else right--;
}

console.log(answer);
