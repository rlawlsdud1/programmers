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

const T = Number(input[0]);
const info = input.slice(1, 1 + T).map((v) => v.split("").map(Number));
const K = Number(input[1 + T]);
const rotateInfo = input
  .slice(2 + T, 2 + T + K)
  .map((v) => v.split(" ").map(Number));

const infoObj = {};
info.forEach((v, i) => {
  infoObj[i + 1] = v;
});

function rotate(arr, dir) {
  if (dir === 1) arr.unshift(arr.pop());
  else arr.push(arr.shift());
}

// 톱니바퀴가 회전할 때 맞닿은 극이 다르다면, 반대 방향으로 회전한다
// 맞닿은 극이 같다면 회전하지 않고 회전은 전이가 안된다
// 독립적으로 움직이는게 아닌, 트리거된 곳으로부터 회전 여부를 체크
// N극은 0, S극은 1

rotateInfo.forEach((v) => {
  const [number, direction] = v;

  // 기준 톱니바퀴의 좌, 우 상태
  const standard = {
    L: infoObj[number][6],
    R: infoObj[number][2],
  };

  const temp = Array.from({ length: T });
  temp[number - 1] = direction;

  let dirOfLeft = direction;
  // 좌측 체크
  for (let i = number - 2; i >= 0; i--) {
    const cur = infoObj[i + 1];

    if (standard.L !== cur[2]) {
      temp[i] = -dirOfLeft;

      dirOfLeft = -dirOfLeft;
      standard.L = cur[6];
    } else break;
  }

  let dirOfRight = direction;
  // 우측 체크
  for (let i = number; i < T; i++) {
    const cur = infoObj[i + 1];

    if (standard.R !== cur[6]) {
      temp[i] = -dirOfRight;

      dirOfRight = -dirOfRight;
      standard.R = cur[2];
    } else break;
  }

  for (let i = 0; i < T; i++) {
    const dir = temp[i];
    if (!dir) continue;

    rotate(infoObj[i + 1], dir);
  }
});

let answer = 0;
Object.values(infoObj).forEach((v) => {
  answer += v[0];
});

console.log(answer);
