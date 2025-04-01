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

// 방향, 회전
const N = Number(input[0]);
const info = input.slice(1, 1 + N);

// 어딜 보고 있냐에 따라서, 상하좌우(이동 방향)가 바뀐다.
// 예를 들어, 카메라가 동쪽을 보고 있을 때, W 를 누르면 동쪽으로 감.

// 카메라가 바라보는 방향
const directions = [
  [0, 1], // 북
  [1, 0], // 동
  [0, -1], // 남
  [-1, 0], // 서
];

const relationDirection = {
  W: 0,
  D: 1,
  S: 2,
  A: 3,
};

const curLocation = [0, 0];

function rotateFunc(command) {
  if (command === "MR") {
    directions.push(directions.shift());
  } else {
    directions.unshift(directions.pop());
  }
}

info.forEach((v) => {
  if (["W", "A", "S", "D"].includes(v)) {
    curLocation[0] += directions[relationDirection[v]][0];
    curLocation[1] += directions[relationDirection[v]][1];
  } else {
    rotateFunc(v);
  }
  const answer = [
    ...curLocation,
    curLocation[0] + directions[2][0],
    curLocation[1] + directions[2][1],
  ];

  console.log(answer.join(" "));
});
