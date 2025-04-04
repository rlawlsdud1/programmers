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
const A = input[1].split(" ").map(Number);
const B = input[2].split(" ").map(Number);

// S의 값을 가장 작게 만들기 위해 A의 수를 재배열하자.
// 단, B에 있는 수는 재배열하면 안 된다.
// A와 B의 각 원소는 100보다 작거나 같은 음이 아닌 정수이다.

A.sort((a, b) => a - b);
B.sort((a, b) => b - a);

let answer = 0;
for (let i = 0; i < N; i++) {
  answer += A[i] * B[i];
}
console.log(answer);
