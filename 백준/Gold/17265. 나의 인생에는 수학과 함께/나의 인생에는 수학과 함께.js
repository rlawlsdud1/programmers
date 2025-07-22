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
const info = input.slice(1, 1 + N).map((v) => v.split(" "));
const visited = Array.from({ length: N }, () =>
  Array.from({ length: N }).fill(false)
);
const directions = [
  [1, 0],
  [0, 1],
];
let ansMax = -Infinity,
  ansMin = Infinity;

function operate(acc, op, cur) {
  if (op === "+") return acc + Number(cur);
  else if (op === "-") return acc - Number(cur);
  else return acc * Number(cur);
}

function DFS(x, y, acc, operator) {
  if (x === N - 1 && y === N - 1) {
    ansMax = Math.max(ansMax, acc);
    ansMin = Math.min(ansMin, acc);
    return;
  }

  for (const direction of directions) {
    const [nx, ny] = [x + direction[0], y + direction[1]];
    if (nx >= 0 && ny >= 0 && nx < N && ny < N && !visited[nx][ny]) {
      visited[nx][ny] = true;

      if (!isNaN(info[nx][ny])) {
        DFS(nx, ny, operate(acc, operator, info[nx][ny]), "");
      } else {
        DFS(nx, ny, acc, info[nx][ny]);
      }

      visited[nx][ny] = false;
    }
  }
}

visited[0][0] = true;
DFS(0, 0, Number(info[0][0]), "");

console.log(`${ansMax} ${ansMin}`);
