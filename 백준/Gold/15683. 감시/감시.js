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

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((v) => v.split(" ").map(Number));
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

// cctv 별 가능한 방향
// 각 원소에 담긴 value들은 directions의 index와 같다
const cctvDirections = {
  1: [[0], [1], [2], [3]],
  2: [
    [0, 2],
    [1, 3],
  ],
  3: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ],
  4: [
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 0],
    [3, 0, 1],
  ],
  5: [[0, 1, 2, 3]],
};

const cctvs = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if ([1, 2, 3, 4, 5].includes(map[i][j])) {
      cctvs.push([i, j, map[i][j]]);
    }
  }
}

function watch(x, y, dir, map) {
  // cctv의 좌표를 인자로 받고 map을 갱신하는 함수
  let [dx, dy] = directions[dir];
  let nx = x + dx;
  let ny = y + dy;
  while (nx >= 0 && ny >= 0 && nx < N && ny < M) {
    if (map[nx][ny] === 6) break;
    if (map[nx][ny] === 0) map[nx][ny] = "#";
    nx += dx;
    ny += dy;
  }
}

let answer = Infinity;

function DFS(idx, updatedMap) {
  if (idx === cctvs.length) {
    // base case
    // 사각지대 개수 갱신
    let count = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (updatedMap[i][j] === 0) count++;
      }
    }
    answer = Math.min(answer, count);
    return;
  }
  // 여기에 DFS 로직 작성
  const [x, y, type] = cctvs[idx];
  const copiedMap = JSON.parse(JSON.stringify(updatedMap));

  // 가능한 방향에 대해
  for (const dirs of cctvDirections[type]) {
    for (const dir of dirs) {
      // 한 방향씩 뚫는다
      watch(x, y, dir, updatedMap);
    }
    // type에 따라 가능한 방향을 탐색 했으면, 다음 cctv 탐색 출발
    // (1번 cctv에 대해서는 위쪽 훑고 다음 탐색 진행하겠지)
    DFS(idx + 1, updatedMap);

    // 탐색 마치고 돌아오면 맵 원복 시키기
    updatedMap = JSON.parse(JSON.stringify(copiedMap));
  }
}

DFS(0, map);
console.log(answer);
