const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((v) => v.trim());

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((v) => v.split(" ").map(Number));

let directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

const region = Array.from({ length: N }, () =>
  Array.from({ length: M }).fill(0)
);

function checktransition(x, y, value, visited) {
  const cur = map[x][y];

  for (const direction of directions) {
    const [nx, ny] = [x + direction[0], y + direction[1]];

    if (nx >= 0 && ny >= 0 && nx < N && ny < M && !visited[nx][ny]) {
      const next = map[nx][ny];

      if (cur >= next) {
        region[nx][ny] = value;
        visited[nx][ny] = true;
        checktransition(nx, ny, value, visited);
      }
    }
  }
}

let regionNum = 1;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (!region[i][j]) {
      region[i][j] = regionNum;

      const visited = Array.from({ length: N }, () =>
        Array.from({ length: M }).fill(false)
      );
      visited[i][j] = true;

      checktransition(i, j, regionNum, visited);
      regionNum++;
    }
  }
}

const answerSet = new Set();

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    answerSet.add(region[i][j]);
  }
}

console.log(answerSet.size);
