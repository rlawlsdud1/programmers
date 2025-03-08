const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

// 12시방향부터 시계방향 순서대로 주어진다
// N극은 0, S극은 1로 나타난다
// 다섯째 줄에는 회전 횟수 K

// 첫 번째 정수는 회전시킨 톱니바퀴의 번호, 두 번째 정수는 방향
// 방향이 1인 경우는 시계 방향이고, -1인 경우는 반시계 방향

let status = input.slice(0, 4).map((v) => v.trim().split("").map(Number));
let K = Number(input[4]);
const orders = input.slice(5).map((v) => v.trim().split(" ").map(Number));

function rotate(target, direction) {
  if (direction === 1) {
    status[target].unshift(status[target].pop());
  } else {
    status[target].push(status[target].shift());
  }
}

for (let i = 0; i < K; i++) {
  const [target, direction] = orders[i];

  const start = target - 1;

  const rotateDirections = Array.from({ length: 4 }).fill(0);
  rotateDirections[start] = direction;

  // 왼쪽
  for (let j = start - 1; j >= 0; j--) {
    if (status[j][2] !== status[j + 1][6]) {
      rotateDirections[j] = -rotateDirections[j + 1];
    } else {
      break;
    }
  }

  // 오른쪽
  for (let k = start + 1; k < 4; k++) {
    if (status[k][6] !== status[k - 1][2]) {
      rotateDirections[k] = -rotateDirections[k - 1];
    } else {
      break;
    }
  }

  for (let l = 0; l < 4; l++) {
    if (rotateDirections[l]) {
      rotate(l, rotateDirections[l]);
    }
  }
}

let answer = 0;
for (let i = 0; i < 4; i++) {
  if (status[i][0]) answer += 2 ** i;
}

console.log(answer);
