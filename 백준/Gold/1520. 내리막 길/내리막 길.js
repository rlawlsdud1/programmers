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

const dp = Array.from({ length: N }, () => Array.from({ length: M }).fill(-1));

function DFS(x, y) {
  if (x === N - 1 && y === M - 1) return 1;
  if (dp[x][y] !== -1) return dp[x][y];

  dp[x][y] = 0;

  for (const direction of directions) {
    const [nx, ny] = [x + direction[0], y + direction[1]];
    if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
      if (map[nx][ny] < map[x][y]) {
        dp[x][y] += DFS(nx, ny);
      }
    }
  }

  return dp[x][y];
}

DFS(0, 0);
console.log(dp[0][0]);
