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
const numbers = input[1].split(" ").map(Number);
numbers.sort((a, b) => a - b);
let curMinValue = Infinity;
let answer = [];
// 0에 가장 가까운 세 값을 출력하자
for (let pointer = 0; pointer < numbers.length - 2; pointer++) {
  let left = pointer + 1,
    right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[pointer] + numbers[left] + numbers[right];
    if (Math.abs(sum) < curMinValue) {
      curMinValue = Math.abs(sum);
      answer = [numbers[pointer], numbers[left], numbers[right]];
    }

    if (sum >= 0) {
      right--;
    } else {
      left++;
    }
  }
}
console.log(answer.join(" "));
