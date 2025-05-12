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
const info = input.slice(1, 1 + N).map(Number);

let answer = 0;
const stack = [];

// 값을 중복 사용 해야할 듯 하다.
// 관점을 바꿔서 자기를 몇명이 볼 수 있는지 확인하자
for (let i = 0; i < N; i++) {
  const cur = info[i];

  while (stack[stack.length - 1] <= cur) {
    stack.pop();
  }
  answer += stack.length;
  stack.push(info[i]);
}

console.log(answer);
