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
const info = input.slice(1, 1 + N).map(Number);

let right = BigInt(Math.max(...info) * M);
let left = BigInt(0);
let answer = right;

while (left <= right) {
  const mid = (right + left) / 2n;
  let count = BigInt(0);

  info.forEach((v) => {
    count += mid / BigInt(v);
  });

  if (count >= M) {
    answer = answer < mid ? answer : mid;
    right = mid - 1n;
  } else {
    left = mid + 1n;
  }
}
console.log(left.toString());
