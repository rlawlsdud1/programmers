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

const [N, C] = input[0].split(" ").map(Number);
const coordinates = input.slice(1, 1 + N).map(Number);

coordinates.sort((a, b) => a - b);

let left = 0,
  right = coordinates[N - 1] - coordinates[0];

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  let count = 1;
  let prev = 0;
  for (let i = 1; i < coordinates.length; i++) {
    const gap = coordinates[i] - coordinates[prev];

    if (gap >= mid) {
      prev = i;
      count++;
    }
  }

  if (count >= C) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}
console.log(right);
