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
const info = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
info.sort((a, b) => a[0] - b[0]);

const stack = [];
let answer = 0;

info.forEach((v) => {
  const [_, y] = v;

  while (stack[stack.length - 1] >= y) {
    const top = stack[stack.length - 1];

    if (y < top) answer++;
    stack.pop();
  }

  if (y !== 0) stack.push(y);
});

answer += stack.length;
console.log(answer);
