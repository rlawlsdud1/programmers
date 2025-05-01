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

const prefix = [info[0]]; // 오른쪽으로 가면서 누적합

for (let i = 1; i < N; i++) {
  prefix[i] = prefix[i - 1] + info[i];
}

// case1) 통이 오른쪽 끝, 벌1이 왼쪽 끝 -> 벌2만 이동
let case1Sum = 0;
for (let i = 1; i < N - 1; i++) {
  let tempSum = 0;

  // 왼쪽 끝에 있는 벌1이 먹을 수 있는 양
  tempSum += prefix[N - 1] - info[i] - prefix[0];

  // 움직이는 벌2가 먹을 수 있는 양
  tempSum += prefix[N - 1] - prefix[i];
  case1Sum = Math.max(case1Sum, tempSum);
}

// case2) 통이 왼쪽 끝, 벌1이 오른쪽 끝 -> 벌2만 이동
const reverseInfo = info.reverse();
const reversePrefix = [info[0]];
for (let i = 1; i < N; i++) {
  reversePrefix[i] = reversePrefix[i - 1] + reverseInfo[i];
}

let case2Sum = 0;
for (let i = 1; i < N - 1; i++) {
  let tempSum = 0;

  // 왼쪽 끝에 있는 벌1이 먹을 수 있는 양
  tempSum += reversePrefix[N - 1] - info[i] - reversePrefix[0];

  // 움직이는 벌2가 먹을 수 있는 양
  tempSum += reversePrefix[N - 1] - reversePrefix[i];
  case2Sum = Math.max(case2Sum, tempSum);
}

// case3) 통이 중간, 벌1과 벌2가 각각 양 끝 -> 통만 이동
let case3Sum = 0;
for (let i = 1; i < N - 1; i++) {
  let tempSum = 0;

  tempSum += prefix[i] - prefix[0];
  tempSum += reversePrefix[N - i - 1] - reversePrefix[0];

  case3Sum = Math.max(case3Sum, tempSum);
}
console.log(Math.max(case1Sum, case2Sum, case3Sum));
