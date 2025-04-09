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
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const checkSet = new Set();
checkSet.add(info[0][0]);
let answer = 0;

function DFS(x, y, count) {
  answer = Math.max(answer, count);
  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx < R && ny < C) {
      if (!checkSet.has(info[nx][ny])) {
        checkSet.add(info[nx][ny]);
        DFS(nx, ny, count + 1);
        checkSet.delete(info[nx][ny]);
      }
    }
  }
}

DFS(0, 0, 1);
console.log(answer);
