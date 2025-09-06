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

const N = BigInt(input[0]);
const info = input[1].split(" ").map(Number);

if (N === 1n) {
  info.sort((a, b) => a - b);
  console.log(info.reduce((acc, cur) => acc + cur, 0) - info[5]);
  process.exit();
}

let minVal = Infinity;
let twoSum = Infinity;
let threeSum = Infinity;

info.forEach((v) => {
  minVal = Math.min(minVal, v);
});

minVal = BigInt(minVal);

const twoCandidate = [
  [5, 1],
  [5, 2],
  [5, 3],
  [5, 4],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [4, 2],
  [2, 1],
  [1, 3],
  [3, 4],
];

twoCandidate.forEach((v) => {
  const [a, b] = v;
  twoSum = Math.min(twoSum, info[a] + info[b]);
});

const threeCandidate = [
  [5, 2, 1],
  [5, 1, 3],
  [5, 3, 4],
  [5, 4, 2],
  [0, 2, 1],
  [0, 1, 3],
  [0, 3, 4],
  [0, 4, 2],
];

threeCandidate.forEach((v) => {
  const [a, b, c] = v;
  threeSum = Math.min(threeSum, info[a] + info[b] + info[c]);
});

const sum =
  BigInt((N - 2n) ** 2n + 4n * (N - 1n) * (N - 2n)) * minVal +
  BigInt(8n * N - 12n) * BigInt(twoSum) +
  BigInt(4n * BigInt(threeSum));

console.log(String(sum));
