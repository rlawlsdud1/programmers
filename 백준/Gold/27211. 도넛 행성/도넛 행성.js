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
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function BFS(x, y) {
  const queue = [];
  queue.push([x, y]);
  let pointer = 0;
  let queueLength = 1;

  while (pointer < queueLength) {
    const [x, y] = queue[pointer++];

    for (let i = 0; i < 4; i++) {
      let [nx, ny] = [x + directions[i][0], y + directions[i][1]];

      // map 을 벗어날 때의 처리
      if (nx < 0) nx = N + nx;
      else if (nx >= N) nx = N - nx;

      if (ny < 0) ny = M + ny;
      else if (ny >= M) ny = M - ny;

      if (map[nx][ny] === 0) {
        queue.push([nx, ny]);
        map[nx][ny] = 1;

        queueLength++;
      }
    }
  }

  return 1;
}

let answer = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 0) {
      map[i][j] = 1;
      answer += BFS(i, j);
    }
  }
}

console.log(answer);
