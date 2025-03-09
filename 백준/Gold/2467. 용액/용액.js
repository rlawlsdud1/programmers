const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

const N = Number(input[0]);
const numbers = input[1].split(" ").map(Number);

numbers.sort((a, b) => a - b);

let left = 0,
  right = N - 1;

let answer = [];
let minValue = Infinity;
while (left < right) {
  const sum = numbers[left] + numbers[right];

  if (Math.abs(sum) < Math.abs(minValue)) {
    minValue = sum;
    answer = [numbers[left], numbers[right]];
  }

  if (sum < 0) {
    left++;
  } else {
    right--;
  }
}

console.log(answer.join(" "));
