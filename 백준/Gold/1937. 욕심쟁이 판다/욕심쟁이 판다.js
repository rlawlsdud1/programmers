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

// dp[i][j] 는 (i,j)에서 출발해서 최대로 움직일 수 있는 칸 수
// 모든 점을 시작점으로 해서 DFS를 돌린다.
// dp[i][j]가 계산되어 있다면 그 값을 사용하고,
// 계산되어있지 않다면, 탐색을 한다.

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const dp = Array.from({ length: n }, () => Array.from({ length: n }).fill(-1));
// -1은 아직 방문 안된 상태.

function DFS(x, y) {
  // 갔더니 이미 계산되어 있는게 있다.
  // 해당 값을 return
  if (dp[x][y] !== -1) return dp[x][y];

  dp[x][y] = 1;

  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx < n && ny < n && map[x][y] < map[nx][ny]) {
      dp[x][y] = Math.max(dp[x][y], DFS(nx, ny) + 1);
    }
  }

  return dp[x][y];
}

let maxMove = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    maxMove = Math.max(maxMove, DFS(i, j));
  }
}

console.log(maxMove);
