const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

const strToArr = input[0].split("");

// 처음과 끝이 연결돼있다 => 원형이다 => 배열 두개를 이어 붙이자

const countOfa = strToArr.filter((v) => v === "a").length;

const doubled = strToArr.concat(strToArr);
let left = 0,
  right = countOfa - 1;

// 초기 윈도우의 b 개수 구해놓고 시작
let countOfb = strToArr.slice(0, countOfa).filter((v) => v === "b").length;

let answer = Infinity;
while (right < strToArr.length * 2 - 1) {
  if (doubled[++right] === "b") countOfb++;
  if (doubled[left++] === "b") countOfb--;

  answer = Math.min(answer, countOfb);
}
console.log(answer);
