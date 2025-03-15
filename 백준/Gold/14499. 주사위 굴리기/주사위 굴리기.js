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

const [N, M, x, y, K] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
const operations = input[1 + N].split(" ").map(Number);

// 가장 처음에 주사위에는 모든 면에 0이 적혀져 있다.
let dice = [0, 0, 0, 0, 0, 0];
// 주사위를 놓은 칸에 쓰여 있는 수는 항상 0이다.

function operation(direction) {
  if (direction === 1) {
    dice = [dice[5], dice[1], dice[4], dice[3], dice[0], dice[2]];
  } else if (direction === 2) {
    dice = [dice[4], dice[1], dice[5], dice[3], dice[2], dice[0]];
  } else if (direction === 3) {
    dice = [dice[1], dice[2], dice[3], dice[0], dice[4], dice[5]];
  } else if (direction === 4) {
    dice = [dice[3], dice[0], dice[1], dice[2], dice[4], dice[5]];
  }
}

const directions = [[], [0, 1], [0, -1], [-1, 0], [1, 0]];

let [curX, curY] = [x, y];

operations.forEach((v) => {
  const direction = v;
  const [nx, ny] = [
    curX + directions[direction][0],
    curY + directions[direction][1],
  ];

  if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
    // 바닥면은 index = 2
    // 윗면은 index = 0
    operation(direction);

    if (map[nx][ny] === 0) map[nx][ny] = dice[2];
    else {
      dice[2] = map[nx][ny];
      map[nx][ny] = 0;
    }

    [curX, curY] = [nx, ny];
    console.log(dice[0]);
  }
});
