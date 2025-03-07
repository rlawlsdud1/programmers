const fs = require("fs");
// 제출할때는 '/dev/stdin' 로 바꾸기
let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map((v) => v.trim());

const n = Number(input[0]);
const numbers = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const x = Number(input[2]);
let left = 0,
  right = n - 1;

let answer = 0;
while (left < right) {
  const sum = numbers[left] + numbers[right];

  if (sum === x) {
    answer++;
    left++;
  } else if (sum > x) {
    right--;
  } else {
    left++;
  }
}

console.log(answer);
