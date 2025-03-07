const fs = require("fs");
// 제출할때는 '/dev/stdin' 로 바꾸기
let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map((v) => v.trim());

const N = Number(input[0]);
const values = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let [left, right] = [0, N - 1];
let temp = Infinity;
let answer = [];

while (left < right) {
  const sum = values[left] + values[right];

  if (Math.abs(sum) < Math.abs(temp)) {
    answer = [values[left], values[right]];
    temp = sum;
  }

  if (!sum) break;

  if (sum > 0) {
    right--;
  } else {
    left++;
  }
}

console.log(answer.join(" "));
