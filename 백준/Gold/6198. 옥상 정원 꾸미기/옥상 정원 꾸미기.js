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
const heights = input.slice(1).map((v) => Number(v));

const stack = [];
let answer = 0;

for (let i = 0; i < N; i++) {
  const cur = heights[i];

  while (stack.length && stack[stack.length - 1] <= cur) {
    stack.pop();
  }
  answer += stack.length;
  stack.push(cur);
}

console.log(answer);
