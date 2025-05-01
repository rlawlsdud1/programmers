const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((v) => v.trim());

const [N, M] = input[0].split(" ").map(Number);

const numbers = input.slice(1, 1 + N).map(Number);
numbers.sort((a, b) => a - b);
let left = 0,
  right = 1,
  minValue = Infinity;
while (right < N) {
  const difference = numbers[right] - numbers[left];

  if (difference >= M) {
    if (difference === M) {
      left++;
      right++;
    } else {
      left++;
    }
    minValue = Math.min(minValue, difference);
  } else {
    right++;
  }
}

console.log(minValue);
