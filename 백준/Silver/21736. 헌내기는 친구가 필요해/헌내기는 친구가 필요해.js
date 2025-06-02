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
const info = input.slice(1, 1 + N).map((v) => v.split(""));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let x, y;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (info[i][j] === "I") {
      x = i;
      y = j;
    }
  }
}

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }).fill(false)
);

const queue = [];
queue.push([x, y]);
visited[x][y] = true;

let count = 0;
while (queue.length) {
  const [x, y] = queue.shift();
  if (info[x][y] === "P") count++;

  for (const direction of directions) {
    const [nx, ny] = [x + direction[0], y + direction[1]];

    if (
      nx >= 0 &&
      ny >= 0 &&
      nx < N &&
      ny < M &&
      !visited[nx][ny] &&
      info[nx][ny] !== "X"
    ) {
      queue.push([nx, ny]);
      visited[nx][ny] = true;
    }
  }
}

console.log(count ? count : "TT");
