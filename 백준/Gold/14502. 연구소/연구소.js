const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

const [N, M] = input[0].trim().split(" ").map(Number);
const map = input.slice(1).map((v) => v.trim().split(" ").map(Number));

// 3 ≤ N, M ≤ 8
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function DFS(x, y, copy) {
  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx < N && ny < M && !copy[nx][ny]) {
      copy[nx][ny] = 2;
      DFS(nx, ny, copy);
    }
  }
}
function countSafeArea(map) {
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!map[i][j]) count++;
    }
  }
  return count;
}
let answer = 0;
// 꼭 3개를 세워야 한다
function installWalls(count) {
  if (count === 3) {
    const copy = JSON.parse(JSON.stringify(map));

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (copy[i][j] === 2) {
          DFS(i, j, copy);
        }
      }
    }
    const count = countSafeArea(copy);
    answer = Math.max(answer, count);
    return;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!map[i][j]) {
        map[i][j] = 1;
        installWalls(count + 1);
        map[i][j] = 0;
      }
    }
  }
}

installWalls(0);

console.log(answer);
