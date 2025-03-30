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

const N = Number(input[0]);
const map = input.slice(1).map((v) => v.split(" ").map(Number));

const checkSet = new Set();
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    checkSet.add(map[i][j]);
  }
}

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function DFS(x, y, visited, target) {
  visited[x][y] = true;

  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (
      nx >= 0 &&
      ny >= 0 &&
      nx < N &&
      ny < N &&
      !visited[nx][ny] &&
      map[nx][ny] > target
    ) {
      DFS(nx, ny, visited, target);
    }
  }
}

let answer = 1;

checkSet.forEach((v) => {
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: N }).fill(false)
  );
  let safeAreaCnt = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] > v && !visited[i][j]) {
        DFS(i, j, visited, v);
        safeAreaCnt++;
      }
    }
  }

  answer = Math.max(answer, safeAreaCnt);
});

console.log(answer);
