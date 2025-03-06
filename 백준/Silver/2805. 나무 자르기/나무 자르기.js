const fs = require("fs");
// 제출할때는 '/dev/stdin' 로 바꾸기
let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map((v) => v.trim());

input = input.map((v) => v.split(" ").map(Number));
const [_, M] = input[0];
const trees = input[1];

let [left, right] = [1, Math.max(...trees)];

let answer = 0;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  let sum = 0;
  for (const tree of trees) {
    sum += Math.max(0, tree - mid);
  }

  if (sum >= M) {
    answer = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(answer);
