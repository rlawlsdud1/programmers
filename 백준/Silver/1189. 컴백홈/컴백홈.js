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

const [R, C, K] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + R).map((v) => v.split(""));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const visited = Array.from({ length: R }, () =>
  Array.from({ length: C }).fill(false)
);

visited[R - 1][0] = true;

let answer = 0;
function DFS(x, y, visited, count) {
  if (x === 0 && y === C - 1 && count === K) {
    answer++;
    return;
  }

  for (const direction of directions) {
    const [nx, ny] = [x + direction[0], y + direction[1]];

    if (nx >= 0 && ny >= 0 && nx < R && ny < C) {
      if (map[nx][ny] === "." && !visited[nx][ny]) {
        visited[nx][ny] = true;
        DFS(nx, ny, visited, count + 1);
        visited[nx][ny] = false;
      }
    }
  }
}

DFS(R - 1, 0, visited, 1);
console.log(answer);
