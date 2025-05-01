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

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let canGoOutside = false;
let JHQueue = [];
let fireQueue = [];

const fireVisited = Array.from({ length: R }, () =>
  Array.from({ length: C }).fill(false)
);

const JHVisited = Array.from({ length: R }, () =>
  Array.from({ length: C }).fill(false)
);

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (map[i][j] === "F") {
      fireVisited[i][j] = true;
      fireQueue.push([i, j]);
    } else if (map[i][j] === "J") {
      JHVisited[i][j] = true;
      JHQueue.push([i, j, 0]);
    }
  }
}

while (JHQueue.length && !canGoOutside) {
  const fireCnt = fireQueue.length;
  const copyFireQueue = [];

  for (let i = 0; i < fireCnt; i++) {
    const [x, y] = fireQueue[i];

    for (let j = 0; j < 4; j++) {
      const [nx, ny] = [x + directions[j][0], y + directions[j][1]];
      if (nx >= 0 && ny >= 0 && nx < R && ny < C) {
        if (map[nx][ny] !== "#" && !fireVisited[nx][ny]) {
          fireVisited[nx][ny] = true;
          copyFireQueue.push([nx, ny]);
        }
      }
    }
  }

  fireQueue = copyFireQueue;

  const JHCnt = JHQueue.length;
  const copyJHQueue = [];

  for (let j = 0; j < JHCnt; j++) {
    const [x, y, count] = JHQueue[j];

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
      if (nx >= 0 && ny >= 0 && nx < R && ny < C) {
        if (map[nx][ny] !== "#" && !fireVisited[nx][ny] && !JHVisited[nx][ny]) {
          copyJHQueue.push([nx, ny, count + 1]);
          JHVisited[nx][ny] = true;
        }
      } else {
        canGoOutside = true;
        console.log(count + 1);
        break;
      }
    }

    if (canGoOutside) break;
  }

  JHQueue = copyJHQueue;
}

if (!canGoOutside) console.log("IMPOSSIBLE");
