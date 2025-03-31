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

const [M, N] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((v) => v.split(""));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }).fill(false)
);
function DFS(x, y, target) {
  let count = 1;

  visited[x][y] = true;

  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];

    if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
      if (!visited[nx][ny] && map[nx][ny] === target) {
        count += DFS(nx, ny, target);
      }
    }
  }

  return count;
}

let WCnt = 0,
  BCnt = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (!visited[i][j] && map[i][j] === "W") {
      WCnt += DFS(i, j, "W") ** 2;
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (!visited[i][j] && map[i][j] === "B") {
      BCnt += DFS(i, j, "B") ** 2;
    }
  }
}

console.log(WCnt, BCnt);
