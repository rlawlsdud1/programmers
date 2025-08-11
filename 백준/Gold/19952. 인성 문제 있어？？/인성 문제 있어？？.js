const { hasSubscribers } = require("diagnostics_channel");
const fs = require("fs");
const path = require("path");
const { hasUncaughtExceptionCaptureCallback } = require("process");
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

const T = Number(input[0]);
const info = input.slice(1);
let idx = 0;

for (let i = 0; i < T; i++) {
  const [H, W, O, F, startX, startY, desX, desY] = info[idx++]
    .split(" ")
    .map(Number);

  const obstacle = {};

  const obstacleInfo = info
    .slice(idx, idx + O)
    .map((v) => v.split(" ").map(Number));

  obstacleInfo.forEach((v) => {
    const [X, Y, L] = v;
    obstacle[`${X},${Y}`] = L;
  });

  const queue = [];
  let startHeight = 0;
  if (obstacle[`${startX},${startY}`])
    startHeight = obstacle[`${startX},${startY}`];

  const visited = new Set();
  visited.add(`${startX},${startY},${F}`);
  queue.push([startX, startY, startHeight, F]);
  let isPossible = false;

  while (queue.length) {
    const [x, y, h, f] = queue.shift();

    if (x === desX && y === desY) {
      isPossible = true;
      console.log("잘했어!!");
      break;
    }

    for (const direction of directions) {
      const [nx, ny] = [x + direction[0], y + direction[1]];
      const nextHeight = obstacle[`${nx},${ny}`] || 0;

      if (
        nx >= 1 &&
        ny >= 1 &&
        nx <= H &&
        ny <= W &&
        f >= 1 &&
        !visited.has(`${nx},${ny},${f - 1}`)
      ) {
        if (nextHeight) {
          if (h < nextHeight) {
            if (nextHeight - h <= f) {
              visited.add(`${nx},${ny},${f - 1}`);
              queue.push([nx, ny, nextHeight, f - 1]);
            }
          } else {
            visited.add(`${nx},${ny},${f - 1}`);
            queue.push([nx, ny, nextHeight, f - 1]);
          }
        } else {
          // 높이 정보가 없음 === 높이는 0
          visited.add(`${nx},${ny},${f - 1}`);
          queue.push([nx, ny, nextHeight, f - 1]);
        }
      }
    }
  }

  if (!isPossible) console.log("인성 문제있어??");

  idx += O;
}
