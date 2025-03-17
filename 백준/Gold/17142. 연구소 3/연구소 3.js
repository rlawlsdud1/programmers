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

const virusPositions = [];
let safeZoneCnt = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 2) virusPositions.push([i, j]);
    else if (map[i][j] === 0) safeZoneCnt++;
  }
}

function BFS(selectedViruses) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: N }).fill(false)
  );
  const queue = [];
  let safeZoneCount = safeZoneCnt;
  let time = 0;

  selectedViruses.forEach(([x, y]) => {
    queue.push([x, y]);
    visited[x][y] = true;
  });

  while (queue.length > 0) {
    if (safeZoneCount === 0) return time;

    const lengthOfQueue = queue.length;

    for (let i = 0; i < lengthOfQueue; i++) {
      const [x, y] = queue.shift();
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
          if (!visited[nx][ny] && map[nx][ny] !== 1) {
            visited[nx][ny] = true;
            queue.push([nx, ny]);

            if (map[nx][ny] === 0) safeZoneCount--;
          }
        }
      }
    }
    time++;
  }

  return Infinity;
}

let answer = Infinity;
function backtrack(start, path) {
  if (path.length === M) {
    const time = BFS(path);
    answer = Math.min(answer, time);
    return;
  }

  for (let i = start; i < virusPositions.length; i++) {
    path.push(virusPositions[i]);
    backtrack(i + 1, path);
    path.pop();
  }
}

backtrack(0, []);
console.log(answer === Infinity ? -1 : answer);
