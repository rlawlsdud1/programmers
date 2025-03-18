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
const map = input.slice(1, 1 + N).map((v) => v.split(""));

const directions = [
  [1, 0], // 아래쪽
  [0, 1], // 오른쪽
];

let answer = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < 2; k++) {
      const [x, y] = [i, j];
      const [nx, ny] = [x + directions[k][0], y + directions[k][1]];
      if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
        // swap 가능하다면
        [map[x][y], map[nx][ny]] = [map[nx][ny], map[x][y]];

        answer = Math.max(answer, findMaxValue(map));
        // 다시 원복
        [map[x][y], map[nx][ny]] = [map[nx][ny], map[x][y]];
      }
    }
  }
}

function findMaxValue(map) {
  let maxValue = 0;
  // 행부터
  for (let i = 0; i < N; i++) {
    let count = 1;
    const row = map[i];

    for (let j = 0; j < N - 1; j++) {
      if (row[j] === row[j + 1]) {
        count++;
        maxValue = Math.max(maxValue, count);
      } else {
        count = 1;
      }
    }
  }

  // 열 체크
  for (let j = 0; j < N; j++) {
    const column = [];
    for (let i = 0; i < N; i++) {
      column.push(map[i][j]);
    }

    let count = 1;

    for (let k = 0; k < N - 1; k++) {
      if (column[k] === column[k + 1]) {
        count++;
        maxValue = Math.max(maxValue, count);
      } else {
        count = 1;
      }
    }
  }

  return maxValue;
}

console.log(answer);
