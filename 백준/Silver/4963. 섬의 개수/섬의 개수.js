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

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

function DFS(x, y, map, M, N) {
  for (let i = 0; i < 8; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx < M && ny < N && map[nx][ny]) {
      map[nx][ny] = 0;
      DFS(nx, ny, map, M, N);
    }
  }
}

for (let i = 0; i < input.length; i++) {
  if (input[i] === "0 0") break;

  const [N, M] = input[i].split(" ").map(Number);
  const map = input
    .slice(i + 1, i + 1 + M)
    .map((v) => v.split(" ").map(Number));

  let count = 0;

  for (let x = 0; x < M; x++) {
    for (let y = 0; y < N; y++) {
      if (map[x][y]) {
        map[x][y] = 0;
        DFS(x, y, map, M, N);
        count++;
      }
    }
  }

  console.log(count);

  i += M;
}
