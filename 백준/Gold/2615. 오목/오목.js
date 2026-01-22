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

const maps = input.map((v) => v.split(" ").map(Number));
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

let check_end = false;

for (let x = 0; x < 19; x++) {
  for (let y = 0; y < 19; y++) {
    const cur = maps[x][y];

    if (cur) {
      if (checkContinuous(x, y, maps, cur)) break;
    }
  }

  if (check_end) break;
}

function checkContinuous(x, y, maps, color) {
  for (const direction of directions) {
    const path = [];
    path.push([x, y]);

    const [dx, dy] = [direction[0], direction[1]];
    let [nx, ny] = [x + dx, y + dy];

    let count = 1;

    while (count < 5) {
      path.push([nx, ny]);

      if (checkInside(nx, ny)) {
        if (maps[nx][ny] === color) {
          nx += dx;
          ny += dy;
        } else break;
      } else break;

      count++;
    }

    if (count === 5) {
      if (!checkInside(nx, ny) || maps[nx][ny] !== color) {
        // 시작점 이전의 점 체크해줘야함
        const [px, py] = [x - dx, y - dy];

        if (!checkInside(px, py) || maps[px][py] !== color) {
          console.log(color);
          path.sort((a, b) => a[1] - b[1]);
          console.log(path[0][0] + 1, path[0][1] + 1);

          check_end = true;
          return true;
        }
      }
    }
  }
}

function checkInside(x, y) {
  if (x >= 0 && y >= 0 && x < 19 && y < 19) return true;
}

if (!check_end) console.log(0);
