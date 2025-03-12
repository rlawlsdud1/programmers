const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((v) => v.trim());

const [N, L, R] = input[0].split(" ").map(Number);
const map = input.slice(1, N + 1).map((v) => v.split(" ").map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let count = 0;
while (1) {
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: N }).fill(false)
  );

  const regions = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        const oneRegion = [];
        const queue = [];
        visited[i][j] = true;
        queue.push([i, j]);

        while (queue.length) {
          const [x, y] = queue.shift();
          const cur = map[x][y];
          oneRegion.push([x, y]);

          for (let i = 0; i < 4; i++) {
            const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
            if (nx >= 0 && ny >= 0 && nx < N && ny < N && !visited[nx][ny]) {
              if (
                Math.abs(map[nx][ny] - cur) >= L &&
                Math.abs(map[nx][ny] - cur) <= R
              ) {
                visited[nx][ny] = true;
                queue.push([nx, ny]);
              }
            }
          }
        }

        if (oneRegion.length > 1) regions.push(oneRegion);
      }
    }
  }
  regions.forEach((v) => {
    const average = calcaulateRegion(v, map);
    v.forEach((e) => {
      const [x, y] = e;
      map[x][y] = average;
    });
  });

  if (!regions.length) break;
  count++;
}
console.log(count);

function calcaulateRegion(regions, map) {
  let sum = 0;
  regions.forEach((v) => {
    const [nx, ny] = v;
    sum += map[nx][ny];
  });

  return Math.floor(sum / regions.length);
}
