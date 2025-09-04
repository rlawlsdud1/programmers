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

// 1 ≤ K ≤ 1,000
const [N, K] = input[0].split(" ").map(Number);
const info = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
const [S, X, Y] = input[1 + N].split(" ").map(Number);

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const typeOfViruses = new Set();
const locationObj = {};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const cur = info[i][j];
    if (cur !== 0) {
      typeOfViruses.add(cur);

      if (locationObj[cur]) locationObj[cur].push([i, j]);
      else locationObj[cur] = [[i, j]];
    }
  }
}

const viruses = [...typeOfViruses].sort((a, b) => a - b);

let count = 0;
while (count < S) {
  for (const virus of viruses) {
    const temp = [];
    // 확산이 일어난 곳은 다시 체크할 필요가 없음

    locationObj[virus].forEach((v) => {
      const [x, y] = v;

      for (const direction of directions) {
        const [nx, ny] = [x + direction[0], y + direction[1]];
        if (nx >= 0 && ny >= 0 && nx < N && ny < N && info[nx][ny] === 0) {
          info[nx][ny] = virus;
          temp.push([nx, ny]);
        }
      }
    });

    locationObj[virus] = temp;
  }
  count++;
}
console.log(info[X - 1][Y - 1]);
