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
const checkObj = {};
checkObj[info[0]] = 1;

let left = 0,
  answer = 1;

// 4 3 2 1 2 6
// 연속한 1개 이상의 수를 뽑았을 때 같은 수가 여러 번 등장하지 않는 경우의 수
for (let right = 1; right < N; right++) {
  if (checkObj[info[right]]) {
    while (checkObj[info[right]]) {
      delete checkObj[info[left++]];
    }
  }
  checkObj[info[right]] = 1;
  answer += right - left + 1;
}
console.log(answer);
