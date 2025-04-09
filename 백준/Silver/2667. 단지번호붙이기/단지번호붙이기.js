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
const map = input.slice(1, 1 + N).map((v) => v.split("").map(Number));
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function DFS(x, y) {
  let count = 1;
  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx < N && ny < N && map[nx][ny]) {
      map[nx][ny] = 0;
      count += DFS(nx, ny);
    }
  }

  return count;
}

const answer = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j]) {
      map[i][j] = 0;
      answer.push(DFS(i, j));
    }
  }
}

answer.sort((a, b) => a - b);
console.log(answer.length);
answer.forEach((v) => {
  console.log(v);
});
