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

const answer = Array.from({ length: N }).fill(0);
const stack = [];

for (let i = 0; i < N; i++) {
  const cur = info[i];

  while (info[stack[stack.length - 1]] < cur) {
    stack.pop();
  }

  if (stack.length) {
    answer[i] = stack[stack.length - 1] + 1;
  }
  stack.push(i);
}

console.log(answer.join(" "));
