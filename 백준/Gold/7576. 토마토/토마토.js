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

const [M, N] = input[0].split(" ").map(Number);
const map = input.slice(1).map((v) => v.split(" ").map(Number));
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
// 1은 익은 토마토, 0은 익지 않은 토마토
// -1은 토마토가 들어있지 않은 칸
// 2 ≤ M,N ≤ 1,000

const tomatoes = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 1) tomatoes.push([i, j]);
  }
}
const queue = [];
queue.push(tomatoes);

let count = 0;
while (queue.length) {
  const curTomatoes = queue.shift();
  const nextTomatoes = [];

  // while (curTomatoes.length) {
  //   const [x, y] = curTomatoes.shift();

  //   for (let i = 0; i < 4; i++) {
  //     const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
  //     if (nx >= 0 && ny >= 0 && nx < N && ny < M && map[nx][ny] === 0) {
  //       map[nx][ny] = 1;
  //       nextTomatoes.push([nx, ny]);
  //     }
  //   }
  // }

  for (let i = 0; i < curTomatoes.length; i++) {
    const [x, y] = curTomatoes[i];

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
      if (nx >= 0 && ny >= 0 && nx < N && ny < M && map[nx][ny] === 0) {
        map[nx][ny] = 1;
        nextTomatoes.push([nx, ny]);
      }
    }
  }

  if (nextTomatoes.length) {
    count++;
    queue.push(nextTomatoes);
  }
}

let isPossible = true;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 0) {
      isPossible = false;
      break;
    }
  }
}

if (isPossible) {
  console.log(count);
} else {
  console.log(-1);
}
