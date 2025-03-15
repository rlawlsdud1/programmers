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

// -1은 가장 윗행, 아랫 행과 두 칸이상 떨어져 있다
// 무조건 위든 아래든 순환이 일어나고, 공기청정기로 미세먼지가 빨려들어갈 수 있다
const [R, C, T] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + R).map((v) => v.split(" ").map(Number));

// 퍼뜨리고 돌린다 <= 이게 한 싸이클

const purifyMachine = [];
for (let i = 0; i < R; i++) {
  if (map[i][0] === -1) purifyMachine.push(i);
}
const [first, second] = purifyMachine;

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
let count = 0;
while (count < T) {
  // 퍼뜨린다
  // 순차적으로 퍼지는게 아니라 한번에 쫙 퍼지는 것을 어떻게 구현할까?

  const coordinates = [];
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (![-1, 0].includes(map[i][j])) {
        // -1, 0 이 아니라면 미세먼지
        let canToGo = 0;
        // 네 방향 중 갈 수 있는 곳 체크
        for (let k = 0; k < 4; k++) {
          const [nx, ny] = [i + directions[k][0], j + directions[k][1]];
          if (nx >= 0 && ny >= 0 && nx < R && ny < C && map[nx][ny] !== -1) {
            canToGo++;
            coordinates.push([nx, ny, Math.floor(map[i][j] / 5)]);
          }
        }
        map[i][j] = map[i][j] - Math.floor(map[i][j] / 5) * canToGo;
      }
    }
  }
  coordinates.forEach((v) => {
    const [x, y, w] = v;
    map[x][y] += w;
  });
  // 아래 청정기부터
  for (let i = second + 2; i < R; i++) map[i - 1][0] = map[i][0];
  for (let j = 1; j < C; j++) map[R - 1][j - 1] = map[R - 1][j];
  for (let i = R - 2; i >= second; i--) map[i + 1][C - 1] = map[i][C - 1];
  for (let j = C - 2; j >= 1; j--) map[second][j + 1] = map[second][j];
  map[second][1] = 0;

  // 위 청정기
  for (let i = first - 2; i >= 0; i--) map[i + 1][0] = map[i][0];
  for (let j = 1; j < C; j++) map[0][j - 1] = map[0][j];
  for (let i = 1; i <= first; i++) map[i - 1][C - 1] = map[i][C - 1];
  for (let j = C - 2; j >= 1; j--) map[first][j + 1] = map[first][j];
  map[first][1] = 0;

  count++;
}
let answer = 0;
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (map[i][j] !== -1) answer += map[i][j];
  }
}

console.log(answer);
