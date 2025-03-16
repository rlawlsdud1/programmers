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

// 보물은 서로 간에 최단 거리로 이동하는데 있어
// 가장 긴 시간이 걸리는 육지 두 곳에 나뉘어 묻혀있다.

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((v) => v.split(""));
let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === "L") {
      const distance = BFS(i, j, map);
      answer = Math.max(answer, distance);
    }
  }
}

function BFS(x, y, map) {
  const copiedMap = JSON.parse(JSON.stringify(map));
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const queue = [];
  queue.push([x, y, 0]);
  copiedMap[x][y] = "V";
  let maxDist = 0;

  while (queue.length) {
    const [x, y, distance] = queue.shift();
    maxDist = Math.max(maxDist, distance);

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
      if (nx >= 0 && ny >= 0 && nx < N && ny < M && copiedMap[nx][ny] === "L") {
        copiedMap[nx][ny] = "V";
        queue.push([nx, ny, distance + 1]);
      }
    }
  }

  return maxDist;
}

console.log(answer);
