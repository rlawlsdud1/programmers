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

// 오큰수는 오른쪽에 있으면서 A_i 보다 큰 수 중에서 가장 왼쪽에 있는 수를 의미
const N = Number(input[0]);
const numbers = input[1].split(" ").map(Number);

const stack = [];
const answer = Array.from({ length: N }).fill(-1);

for (let i = 0; i < N; i++) {
  // while문 조건을 만족 = 오큰수 등장
  while (numbers[stack[stack.length - 1]] < numbers[i]) {
    const targetNumIdx = stack.pop();
    answer[targetNumIdx] = numbers[i];
  }
  stack.push(i);
}

console.log(answer.join(" "));
