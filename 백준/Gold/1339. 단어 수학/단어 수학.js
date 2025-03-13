const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((v) => v.trim());

const N = Number(input[0]);
const words = input.slice(1, 1 + N);

// 각 알파벳 대문자를 0부터 9까지의 숫자 중 하나로 바꿔서 N개의 수를 합하는 문제
// 같은 알파벳은 같은 숫자
// 두 개 이상의 알파벳이 같은 숫자로 바뀌면 안된다

const weights = {};
words.forEach((v) => {
  const reversed = v.split("").reverse();
  for (let i = 0; i < reversed.length; i++) {
    weights[reversed[i]]
      ? (weights[reversed[i]] += 10 ** i)
      : (weights[reversed[i]] = 10 ** i);
  }
});

const sortedInfo = Object.entries(weights).sort((a, b) => b[1] - a[1]);

const alpabetToNum = {};
let num = 9;
sortedInfo.forEach((v) => {
  alpabetToNum[v[0]] = String(num--);
});

function convertToNum(str) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    result += alpabetToNum[str[i]];
  }

  return result;
}

let sum = 0;
words.forEach((v) => {
  sum += Number(convertToNum(v));
});
console.log(sum);
