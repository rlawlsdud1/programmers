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

function checkMeltingAmount(x, y, map) {
  let count = 0;
  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx < N && ny < M && map[nx][ny] === 0) {
      count++;
    }
  }
  return count;
}

let canDivide = true;
let canContinue = true;
let answer = 0;
while (canContinue) {
  const info = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j]) {
        const count = checkMeltingAmount(i, j, map);
        if (count) info.push([i, j, count]);
      }
    }
  }

  info.forEach((v) => {
    const [x, y, count] = v;
    map[x][y] = Math.max(0, map[x][y] - count);
  });

  // 두덩이인지 확인
  const copiedMap = JSON.parse(JSON.stringify(map));
  let cntOfCheck = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (copiedMap[i][j]) {
        DFS(i, j, copiedMap);
        cntOfCheck++;
      }
    }
  }
  // 만일 빙산이 다 녹을 때까지 분리되지 않으면 0을 출력
  if (cntOfCheck < 2) {
    // 다 녹았는데, 분리가 안된다면
    if (calcalateGlacier(map) === 0) {
      canContinue = false;
      canDivide = false;
    } else {
      answer++;
      continue;
    }
  } else {
    canContinue = false;
  }

  answer++;
}
if (canDivide) console.log(answer);
else console.log(0);

function DFS(x, y, map) {
  map[x][y] = 0;
  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx < N && ny < M && map[nx][ny]) {
      DFS(nx, ny, map);
    }
  }
}

function calcalateGlacier(map) {
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j]) count++;
    }
  }
  return count;
}
