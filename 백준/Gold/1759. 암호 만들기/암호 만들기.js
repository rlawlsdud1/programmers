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

// 암호는 서로 다른 L개의 알파벳 소문자들로 구성되며
// 최소 한 개의 모음(a, e, i, o, u)과 최소 두 개의 자음으로 구성되어 있다
// 암호를 이루는 알파벳이 암호에서 증가하는 순서로 배열되었을 것

const [L, C] = input[0].split(" ").map(Number);
const info = input[1].split(" ");

info.sort();

const vowelArr = ["a", "e", "i", "o", "u"];
const vowelSet = new Set();
vowelArr.forEach((v) => {
  vowelSet.add(v);
});

function isValidPath(path) {
  let count1 = 0; // 모음 개수 체크
  let count2 = 0; // 자음 개수 체크
  path.forEach((v) => {
    if (vowelSet.has(v)) count1++;
    else count2++;
  });

  if (count1 >= 1 && count2 >= 2) return true;
  return false;
}

function setToArr(path) {
  let answer = "";
  path.forEach((v) => {
    answer += v;
  });
  return answer;
}

function BT(path, count, start) {
  if (count === L) {
    if (isValidPath(path)) {
      console.log(setToArr(path));
    }
    return;
  }

  for (let i = start; i < C; i++) {
    if (!path.has(info[i])) {
      path.add(info[i]);
      BT(path, count + 1, i + 1);
      path.delete(info[i]);
    }
  }
}

BT(new Set(), 0, 0);
