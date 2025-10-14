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
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 0],
];

const answer = [];
for (let i = 0; i < 2 * N + 2 * M; i++) {
  const cur = i + 1;
  let start, direction;

  if (cur <= N) {
    start = [i, -1];
    direction = 0;
  } else if (N + 1 <= cur && cur <= N + M) {
    start = [N, cur - (N + 1)];
    direction = 1;
  } else if (N + M + 1 <= cur && cur <= 2 * N + M) {
    start = [2 * N + M - cur, M];
    direction = 2;
  } else if (2 * N + M + 1 <= cur && cur <= 2 * N + 2 * M) {
    start = [-1, 2 * M + 2 * N - cur];
    direction = 3;
  }

  const exit = findExit(start, direction);
  answer[i] = exit;
}

function findExitNum(x, y) {
  if (x === -1) return 2 * M + 2 * N - y;
  else if (y === -1) return x + 1;
  else if (x === N) return N + 1 + y;
  else if (y === M) return 2 * N + M - x;
}

function convertDir(direction) {
  if (direction === 0) return 1;
  else if (direction === 1) return 0;
  else if (direction === 2) return 3;
  else return 2;
}

function findExit(start, direction) {
  let [x, y] = start;
  let curDir = direction;

  while (1) {
    const [nx, ny] = [x + directions[curDir][0], y + directions[curDir][1]];

    x = nx;
    y = ny;

    if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
      if (map[nx][ny] === 1) curDir = convertDir(curDir);
    } else break;
  }
  return findExitNum(x, y);
}

console.log(answer.join(" "));
