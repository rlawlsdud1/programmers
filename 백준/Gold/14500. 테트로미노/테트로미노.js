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
const maps = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));

// 5가지 모양에 대해 가능한 경우를 전부 구하기
const shapes = {
  1: [
    [
      [1, 0],
      [1, 0],
      [1, 0],
    ],
    [
      [0, 1],
      [0, 1],
      [0, 1],
    ],
  ],
  2: [
    [
      [0, 1],
      [1, 0],
      [0, -1],
    ],
  ],
  3: [
    [
      [1, 0],
      [1, 0],
      [0, 1],
    ],
    [
      [1, 0],
      [1, 0],
      [0, -1],
    ],
    [
      [0, 1],
      [0, 1],
      [1, 0],
    ],
    [
      [0, 1],
      [0, 1],
      [-1, 0],
    ],
    [
      [-1, 0],
      [-1, 0],
      [0, 1],
    ],
    [
      [-1, 0],
      [-1, 0],
      [0, -1],
    ],
    [
      [0, -1],
      [0, -1],
      [1, 0],
    ],
    [
      [0, -1],
      [0, -1],
      [-1, 0],
    ],
  ],
  4: [
    [
      [1, 0],
      [0, 1],
      [1, 0],
    ],
    [
      [1, 0],
      [0, -1],
      [1, 0],
    ],
    [
      [0, 1],
      [-1, 0],
      [0, 1],
    ],
    [
      [0, 1],
      [1, 0],
      [0, 1],
    ],
  ],
};

let answer = 0;

const shape_num = [1, 2, 3, 4];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    shape_num.forEach((n) => {
      const shape = shapes[n];

      for (const cur_shape of shape) {
        let [x, y] = [i, j];
        let sum = maps[x][y];
        let isPossible = true;

        for (const dir of cur_shape) {
          const [nx, ny] = [x + dir[0], y + dir[1]];

          if (checkInsideMap(nx, ny)) {
            sum += maps[nx][ny];
            [x, y] = [nx, ny];
          } else {
            isPossible = false;
            break;
          }
        }

        if (isPossible) answer = Math.max(answer, sum);
      }
    });

    // 다섯번째 모양 체크
    checkFifthShape(i, j, maps);
  }
}

function checkFifthShape(x, y, maps) {
  const fifth_shpae = [
    [
      [0, 1],
      [0, 1],
      [-1, 0],
    ],
    [
      [0, 1],
      [0, 1],
      [1, 0],
    ],
    [
      [-1, 0],
      [-1, 0],
      [0, 1],
    ],
    [
      [-1, 0],
      [-1, 0],
      [0, -1],
    ],
  ];

  for (const cur_shape of fifth_shpae) {
    let sum = maps[x][y];

    let [nx, ny] = [x + cur_shape[0][0], y + cur_shape[0][1]];

    if (checkInsideMap(nx, ny)) {
      sum += maps[nx][ny];

      const [nx_1, ny_1] = [nx + cur_shape[1][0], ny + cur_shape[1][1]];
      const [nx_2, ny_2] = [nx + cur_shape[2][0], ny + cur_shape[2][1]];

      if (checkInsideMap(nx_1, ny_1) && checkInsideMap(nx_2, ny_2)) {
        sum += maps[nx_1][ny_1];
        sum += maps[nx_2][ny_2];

        answer = Math.max(answer, sum);
      }
    }
  }
}

function checkInsideMap(x, y) {
  if (x >= 0 && y >= 0 && x < N && y < M) return true;
}

console.log(answer);
