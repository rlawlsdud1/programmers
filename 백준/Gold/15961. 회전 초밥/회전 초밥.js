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

// N : 벨트에 놓인 접시의 수
// d : 초밥의 가짓수
// k : 연속해서 먹는 접시의 수
// c : 쿠폰 번호

const [N, d, k, c] = input[0].split(" ").map(Number);
const info = input.slice(1, 1 + N).map(Number);
const checkObj = {};

const checkSet = new Set();
for (let i = 0; i < k; i++) {
  if (checkObj[info[i]]) {
    checkObj[info[i]] += 1;
  } else {
    checkObj[info[i]] = 1;
    checkSet.add(info[i]);
  }
}
let answer = checkSet.size;
let right = k;
for (let left = 0; left < N; left++) {
  if (checkObj[info[right % N]]) {
    checkObj[info[right % N]] += 1;
  } else {
    checkObj[info[right % N]] = 1;
    checkSet.add(info[right % N]);
  }

  if (checkObj[info[left]] === 1) {
    checkSet.delete(info[left]);
    delete checkObj[info[left]];
  } else {
    checkObj[info[left]] -= 1;
  }
  right++;

  if (checkSet.has(c)) answer = Math.max(answer, checkSet.size);
  else answer = Math.max(answer, checkSet.size + 1);
}

console.log(answer);
[2, 7, 9, 25, 7, 9, 7, 30];
