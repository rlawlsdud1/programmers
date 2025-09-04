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

const K = Number(input[0]);
const info = input.slice(1, 1 + K).map(Number);

const stack = [];
for (let i = 0; i < K; i++) {
  const cur = info[i];

  if (cur === 0) stack.pop();
  else stack.push(cur);
}

console.log(stack.reduce((acc, cur) => acc + cur, 0));
