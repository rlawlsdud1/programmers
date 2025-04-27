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

const [R, C, M] = input[0].split(" ").map(Number);
const info = input.slice(1, 1 + M).map((v) => v.split(" ").map(Number));
// [r, c, 속력, 이동방향, 크기]
// 1 위
// 2 아래
// 3 오
// 4 왼
const directions = {
  1: [-1, 0],
  2: [1, 0],
  3: [0, 1],
  4: [0, -1],
};

// 방향 전환 로직만 잘 세우면 될 듯 하다
const map = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => [])
);

const sharkObj = {};
info.forEach((v, i) => {
  const [x, y, ...remainInfo] = v;
  sharkObj[i + 1] = remainInfo;
  map[x - 1][y - 1].push(i + 1);
});

function moveSharkFunc(sharkNum, x, y) {
  let [speed, direction, _] = sharkObj[sharkNum];

  let count = speed;
  if ([1, 2].includes(direction)) {
    while (count > 0) {
      if (x + directions[direction][0] * count < 0) {
        count -= x;
        x = 0;
        direction = 2;
      } else if (x + directions[direction][0] * count >= R) {
        count -= R - x - 1;
        x = R - 1;
        direction = 1;
      } else {
        x += directions[direction][0] * count;
        count = 0;
      }
    }
  } else {
    while (count > 0) {
      if (y + directions[direction][1] * count < 0) {
        count -= y;
        y = 0;
        direction = 3;
      } else if (y + directions[direction][1] * count >= C) {
        count -= C - y - 1;
        y = C - 1;
        direction = 4;
      } else {
        y += directions[direction][1] * count;
        count = 0;
      }
    }
  }
  map[x][y].push(sharkNum);
  sharkObj[sharkNum][1] = direction;
}

function eatSmallShark() {
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (map[i][j].length >= 2) {
        let largestSharkNum = 0;
        let largestSharkWeight = 0;
        map[i][j].forEach((v) => {
          if (largestSharkWeight < sharkObj[v][2]) {
            largestSharkWeight = sharkObj[v][2];
            largestSharkNum = v;
          }
        });

        const eatenShark = map[i][j].filter((v) => v !== largestSharkNum);
        map[i][j] = [largestSharkNum];
        eatenShark.forEach((v) => {
          delete sharkObj[v];
        });
      }
    }
  }
}

let count = 0;
let answer = 0;

while (count < C) {
  const visited = new Set();

  for (let i = 0; i < R; i++) {
    if (map[i][count].length) {
      answer += sharkObj[map[i][count]][2];
      delete sharkObj[map[i][count][0]];
      map[i][count] = [];
      break;
    }
  }

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (map[i][j].length) {
        if (!visited.has(map[i][j][0])) {
          visited.add(map[i][j][0]);
          moveSharkFunc(map[i][j].shift(), i, j);
        }
      }
    }
  }

  eatSmallShark();
  count++;
}

console.log(answer);
