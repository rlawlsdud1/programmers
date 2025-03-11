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

const N = Number(input[0]);
const budgets = input[1].split(" ").map(Number);
const total = Number(input[2]);

budgets.sort((a, b) => a - b);
let left = 0;
let right = budgets[N - 1];

function validateBudget(candidate) {
  let sum = 0;
  budgets.forEach((v) => {
    if (v <= candidate) {
      sum += v;
    } else {
      sum += candidate;
    }
  });

  return sum;
}

let answer = 0;
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  if (validateBudget(mid) > total) {
    right = mid - 1;
  } else {
    answer = Math.max(answer, mid);
    left = mid + 1;
  }
}

console.log(answer);
