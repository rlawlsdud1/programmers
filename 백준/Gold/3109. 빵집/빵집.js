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

const [R, C] = input[0].split(" ").map(Number);
const info = input.slice(1, 1 + R).map((v) => v.split(""));

const directions = [
  [-1, 1], // 오른쪽 위
  [0, 1], // 우
  [1, 1], // 오른쪽 아래
];

// 진짜 경로를 반영한 방문 배열
const visited = Array.from({ length: R }, () =>
  Array.from({ length: C }).fill(false)
);

function DFS(x, y, tempVisited) {
  if (y === C - 1) return true;

  for (const direction of directions) {
    const [nx, ny] = [x + direction[0], y + direction[1]];

    if (
      nx >= 0 &&
      ny >= 0 &&
      nx < R &&
      ny < C &&
      info[nx][ny] === "." &&
      !visited[nx][ny]
    ) {
      visited[nx][ny] = true;
      if (DFS(nx, ny)) return true;
    }
  }
}

let answer = 0;
for (let i = 0; i < R; i++) {
  if (DFS(i, 0)) {
    answer++;
  }
}
console.log(answer);
