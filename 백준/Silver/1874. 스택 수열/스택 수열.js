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

const n = Number(input[0]);
const info = input.slice(1, 1 + n).map(Number);

const stack = [];
let cur = 1;
let count = 0;
let pointer = 0;
let isPossible = true;
const answer = [];
while (1) {
  if (stack[stack.length - 1] > n) {
    isPossible = false;
    break;
  }
  if (stack.length && info[pointer] === stack[stack.length - 1]) {
    answer.push("-");
    if (stack[stack.length - 1] === info[n - 1]) break;
    stack.pop();
    pointer++;
  } else {
    answer.push("+");
    stack.push(cur++);
  }
  count++;
}

if (isPossible) console.log(answer.join("\n"));
else console.log("NO");
