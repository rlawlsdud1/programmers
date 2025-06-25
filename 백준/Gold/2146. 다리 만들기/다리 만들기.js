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

const N = Number(input[0]);
const map = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const visitedForIsland = new Set();
const islandObj = {};
let islandNum = 0;

function DFSForIsland(x, y, islandNum) {
  for (const direction of directions) {
    const [nx, ny] = [x + direction[0], y + direction[1]];
    const newCoordinate = `${nx},${ny}`;
    if (
      nx >= 0 &&
      ny >= 0 &&
      nx < N &&
      ny < N &&
      map[nx][ny] === 1 &&
      !visitedForIsland.has(newCoordinate)
    ) {
      visitedForIsland.add(newCoordinate);
      islandObj[islandNum].push(newCoordinate);
      DFSForIsland(nx, ny, islandNum);
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const coordinate = `${i},${j}`;
    if (!visitedForIsland.has(coordinate) && map[i][j] === 1) {
      visitedForIsland.add(coordinate);
      islandObj[islandNum] = [coordinate];
      DFSForIsland(i, j, islandNum);
      islandNum++;
    }
  }
}

// 다리를 놓을 수 있는 지점인지 확인하는 함수
function canStart(x, y) {
  for (const direction of directions) {
    const [nx, ny] = [x + direction[0], y + direction[1]];

    // 바다랑 이어진 곳이면 return true
    if (nx >= 0 && ny >= 0 && nx < N && ny < N && map[nx][ny] === 0) {
      return true;
    }
  }

  return false;
}

function BFS(x, y, curIslandNum) {
  const queue = [];
  const visited = new Set();
  queue.push([x, y, 0]);
  visited.add(`${x},${y}`);

  while (queue.length) {
    const [x, y, count] = queue.shift();

    for (const direction of directions) {
      const [nx, ny] = [x + direction[0], y + direction[1]];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < N &&
        !visited.has(`${nx},${ny}`)
      ) {
        if (map[nx][ny] === 0) {
          visited.add(`${nx},${ny}`);
          queue.push([nx, ny, count + 1]);
        } else {
          if (!islandObj[curIslandNum].includes(`${nx},${ny}`)) {
            return count;
          }
        }
      }
    }
  }

  return Infinity;
}

let answer = Infinity;

for (let i = 0; i < islandNum; i++) {
  const island = islandObj[i];

  island.forEach((c) => {
    const [x, y] = c.split(",").map(Number);

    if (canStart(x, y)) {
      const result = BFS(x, y, i);
      answer = Math.min(answer, result);
    }
  });
}

console.log(answer);
