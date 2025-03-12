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

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const testCaseNum = Number(input[0]);
const info = input.slice(1);

let pointer = 0;
for (let i = 0; i < testCaseNum; i++) {
  const [N, M, K] = info[pointer].split(" ").map(Number);
  const map = Array.from({ length: M }, () =>
    Array.from({ length: N }).fill(0)
  );

  for (let j = pointer + 1; j < pointer + 1 + K; j++) {
    const [y, x] = info[j].split(" ").map(Number);

    map[x][y] = 1;
  }

  function DFS(x, y, map) {
    map[x][y] = 0;

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
      if (nx >= 0 && ny >= 0 && nx < M && ny < N && map[nx][ny] === 1) {
        DFS(nx, ny, map);
      }
    }
  }
  let count = 0;
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === 1) {
        DFS(i, j, map);
        count++;
      }
    }
  }
  console.log(count);

  pointer += K + 1;
}
