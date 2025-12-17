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

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let idx = 0;

while (1) {
  const [L, R, C] = input[idx++].split(" ").map(Number);
  if (!L && !R && !C) break;

  const info = Array.from({ length: L });

  for (let i = 0; i < L; i++) {
    info[i] = input.slice(idx, idx + R).map((v) => v.split(""));

    idx += R + 1;
  }

  let S, E;

  const visited = Array.from({ length: L }, () =>
    Array.from({ length: R }, () => Array.from({ length: C }).fill(false))
  );

  for (let i = 0; i < L; i++) {
    for (let j = 0; j < R; j++) {
      for (let k = 0; k < C; k++) {
        if (info[i][j][k] === "S") {
          S = [i, j, k];
          visited[i][j][k] = true;
        }
        if (info[i][j][k] === "E") {
          E = [i, j, k];
          info[i][j][k] = ".";
        }
      }
    }
  }

  let isPossible = false;

  const queue = [[...S, 0]];

  while (queue.length) {
    const [curF, x, y, m] = queue.shift();
    if (curF === E[0] && x === E[1] && y === E[2]) {
      isPossible = true;
      console.log(`Escaped in ${m} minute(s).`);
      break;
    }

    // 동서남북
    for (const direction of directions) {
      const [nx, ny] = [x + direction[0], y + direction[1]];

      if (nx >= 0 && ny >= 0 && nx < R && ny < C) {
        if (info[curF][nx][ny] === "." && !visited[curF][nx][ny]) {
          visited[curF][nx][ny] = true;
          queue.push([curF, nx, ny, m + 1]);
        }
      }
    }

    // 상하
    if (curF + 1 < L) {
      const newF = curF + 1;
      if (info[newF][x][y] === "." && !visited[newF][x][y]) {
        visited[newF][x][y] = true;
        queue.push([newF, x, y, m + 1]);
      }
    }

    if (curF - 1 >= 0) {
      const newF = curF - 1;
      if (info[newF][x][y] === "." && !visited[newF][x][y]) {
        visited[newF][x][y] = true;
        queue.push([newF, x, y, m + 1]);
      }
    }
  }

  if (!isPossible) console.log("Trapped!");
}
