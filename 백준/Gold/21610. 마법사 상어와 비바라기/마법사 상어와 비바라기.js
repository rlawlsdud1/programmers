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
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
];

const diagonalDirections = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
const info = input.slice(1 + N, 1 + N + M).map((v) => v.split(" ").map(Number));

let clouds = [
  [N - 1, 0],
  [N - 1, 1],
  [N - 2, 0],
  [N - 2, 1],
];

for (let i = 0; i < M; i++) {
  const [d, s] = info[i];

  const [dx, dy] = [
    directions[d - 1][0] * (s % N),
    directions[d - 1][1] * (s % N),
  ];

  const movedClouds = new Set();
  for (let j = 0; j < clouds.length; j++) {
    const [x, y] = clouds[j];
    let [nx, ny] = [x + dx, y + dy];

    if (nx < 0) {
      nx = N + nx;
    } else if (nx >= N) {
      nx = nx % N;
    }

    if (ny < 0) {
      ny = N + ny;
    } else if (ny >= N) {
      ny = ny % N;
    }

    movedClouds.add(`${nx},${ny}`);
    map[nx][ny] += 1;
  }

  const candidates = [];
  movedClouds.forEach((v) => {
    const [x, y] = v.split(",").map(Number);
    let count = 0;

    for (const direction of diagonalDirections) {
      const [nx, ny] = [x + direction[0], y + direction[1]];
      if (nx >= 0 && ny >= 0 && nx < N && ny < N && map[nx][ny] >= 1) count++;
    }

    candidates.push([x, y, count]);
  });

  candidates.forEach((v) => {
    const [x, y, count] = v;
    map[x][y] += count;
  });

  const newCloud = [];
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      if (!movedClouds.has(`${x},${y}`) && map[x][y] >= 2) {
        map[x][y] -= 2;
        newCloud.push([x, y]);
      }
    }
  }

  clouds = newCloud;
}

let answer = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    answer += map[i][j];
  }
}

console.log(answer);
