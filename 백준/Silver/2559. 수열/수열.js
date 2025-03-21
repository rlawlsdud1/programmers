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

const [N, K] = input[0].split(" ").map(Number);
const numbers = input[1].split(" ").map(Number);
let left = 0;
let sum = numbers.slice(0, K).reduce((acc, cur) => acc + cur, 0);
let answer = sum;

for (let right = K; right < N; right++) {
  sum -= numbers[left++];
  sum += numbers[right];

  answer = Math.max(answer, sum);
}
console.log(answer);
