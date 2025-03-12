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

let answer = 0;
const stack = [];

for (let i = 0; i < N; i++) {
  while (stack.length > 0 && stack[stack.length - 1] <= heights[i]) {
    stack.pop();
  }
  stack.push(heights[i]);
  answer += stack.length - 1;
}

console.log(answer);
