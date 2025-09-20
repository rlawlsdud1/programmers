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

let queue = [];
let fire = [];
const visited = Array.from({ length: R }, () =>
  Array.from({ length: C }).fill(false)
);

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (info[i][j] === "J") {
      queue.push([i, j, 0]);
      info[i][j] = ".";
    } else if (info[i][j] === "F") {
      fire.push([i, j]);
    }
  }
}

while (queue.length) {
  const temp = [];

  for (let i = 0; i < fire.length; i++) {
    const [x, y] = fire[i];

    for (const direction of directions) {
      const [nx, ny] = [x + direction[0], y + direction[1]];

      if (nx >= 0 && ny >= 0 && nx < R && ny < C && info[nx][ny] === ".") {
        temp.push([nx, ny]);
        info[nx][ny] = "F";
      }
    }
  }

  fire = temp;

  const JHtemp = [];

  for (let i = 0; i < queue.length; i++) {
    const [x, y, count] = queue[i];

    for (const direction of directions) {
      const [nx, ny] = [x + direction[0], y + direction[1]];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < R &&
        ny < C &&
        info[nx][ny] === "." &&
        !visited[nx][ny]
      ) {
        JHtemp.push([nx, ny, count + 1]);
        visited[nx][ny] = true;
      } else if (nx < 0 || ny < 0 || nx >= R || ny >= C) {
        console.log(count + 1);
        process.exit(0);
      }
    }
  }

  queue = JHtemp;
}

console.log("IMPOSSIBLE");
