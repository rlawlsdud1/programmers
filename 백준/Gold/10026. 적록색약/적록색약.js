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

const N = Number(input[0]);
const map = input.slice(1).map((v) => v.split(""));
// 적록색약 빨초를 같은색으로 봄

const disabledMap = JSON.parse(JSON.stringify(map));
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (disabledMap[i][j] === "G") {
      disabledMap[i][j] = "R";
    }
  }
}

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function DFS(x, y, type, map) {
  map[x][y] = "C";

  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx < N && ny < N && map[nx][ny] === type) {
      DFS(nx, ny, type, map);
    }
  }
}

// 일반인
let count1 = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (["R", "G", "B"].includes(map[i][j])) {
      DFS(i, j, map[i][j], map);
      count1++;
    }
  }
}
// 적록색약
let count2 = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (["R", "B"].includes(disabledMap[i][j])) {
      DFS(i, j, disabledMap[i][j], disabledMap);
      count2++;
    }
  }
}
console.log(count1, count2);
