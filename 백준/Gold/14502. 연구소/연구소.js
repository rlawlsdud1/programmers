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

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const emptyCoordinates = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 0) emptyCoordinates.push([i, j]);
  }
}

let answer = 0;
function BT(path, start) {
  if (path.length === 3) {
    const copiedMap = JSON.parse(JSON.stringify(map));
    path.forEach((v) => {
      const [a, b] = v;
      copiedMap[a][b] = 1;
    });

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (copiedMap[i][j] === 2) {
          DFS(i, j, copiedMap);
        }
      }
    }
    let count = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (copiedMap[i][j] === 0) {
          count++;
        }
      }
    }
    answer = Math.max(answer, count);
    return;
  }

  for (let i = start; i < emptyCoordinates.length; i++) {
    path.push(emptyCoordinates[i]);
    BT(path, i + 1);
    path.pop();
  }
}

BT([], 0);

function DFS(x, y, copiedMap) {
  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx < N && ny < M && copiedMap[nx][ny] === 0) {
      copiedMap[nx][ny] = -1;
      DFS(nx, ny, copiedMap);
    }
  }
}

console.log(answer);
