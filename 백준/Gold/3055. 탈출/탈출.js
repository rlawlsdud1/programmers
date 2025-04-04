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

const [R, C] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + R).map((v) => v.split(""));

let hedgehogQueue = [];
let waterQueue = [];

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (map[i][j] === "S") {
      hedgehogQueue.push([i, j, 0]);
    } else if (map[i][j] === "*") {
      waterQueue.push([i, j]);
    }
  }
}

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

while (hedgehogQueue.length) {
  // 물 뿌리기
  const waterLength = waterQueue.length;
  const nextWater = [];
  for (let i = 0; i < waterLength; i++) {
    const [x, y] = waterQueue[i];
    for (let j = 0; j < 4; j++) {
      const [nx, ny] = [x + directions[j][0], y + directions[j][1]];
      if (nx >= 0 && ny >= 0 && nx < R && ny < C) {
        if (map[nx][ny] === ".") {
          map[nx][ny] = "*";
          nextWater.push([nx, ny]);
        }
      }
    }
  }
  waterQueue = nextWater;

  // 고슴도치 이동
  const hedgehogLength = hedgehogQueue.length;
  const nextHedgehog = [];
  for (let i = 0; i < hedgehogLength; i++) {
    const [x, y, t] = hedgehogQueue[i];
    for (let j = 0; j < 4; j++) {
      const [nx, ny] = [x + directions[j][0], y + directions[j][1]];
      if (nx >= 0 && ny >= 0 && nx < R && ny < C) {
        if (map[nx][ny] === "D") {
          console.log(t + 1);
          return;
        }

        if (map[nx][ny] === ".") {
          map[nx][ny] = "S";
          nextHedgehog.push([nx, ny, t + 1]);
        }
      }
    }
  }
  hedgehogQueue = nextHedgehog;
}
console.log("KAKTUS");
