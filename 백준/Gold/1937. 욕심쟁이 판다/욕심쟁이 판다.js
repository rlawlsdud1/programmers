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

const n = Number(input[0]);
const map = input.slice(1).map((v) => v.split(" ").map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const dp = Array.from({ length: n }, () => Array.from({ length: n }).fill(-1));

function DFS(x, y) {
  // 이미 계산되어 있는게 있다면 그 값 사용
  if (dp[x][y] !== -1) return dp[x][y];

  // 그렇지 않다면 1 부터 시작
  dp[x][y] = 1;

  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx < n && ny < n && map[x][y] < map[nx][ny]) {
      dp[x][y] = Math.max(dp[x][y], DFS(nx, ny) + 1);
    }
  }

  return dp[x][y];
}

let answer = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    const count = DFS(i, j);
    answer = Math.max(answer, count);
  }
}

console.log(answer);
