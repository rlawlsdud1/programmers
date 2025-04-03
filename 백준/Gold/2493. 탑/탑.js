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

// 레이저 신호를 수신한 탑들의 번호
// 왼쪽부터 시작해서, 일단 stack에 담자
// 레이저를 쐈을 때, 가장 먼저 만날 수 있는 건물 번호를 알기 위해.

const answer = Array.from({ length: N }).fill(0);
const stack = [];
for (let i = 0; i < N; i++) {
  while (info[stack[stack.length - 1] - 1] < info[i]) {
    stack.pop();
  }
  stack.push(i + 1);
  if (stack.length > 1) {
    answer[i] = stack[stack.length - 2];
  }
}
console.log(answer.join(" "));
