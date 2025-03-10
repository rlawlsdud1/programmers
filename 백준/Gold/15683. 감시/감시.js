const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

// 0은 빈 칸, 6은 벽
// 1~5는 cctv 번호
// cctv는 cctv를 통과할 수 있다
// cctv방향을 적절히 정해서 사각 지대의 최소 크기를 구하자
// = 감시범위가 최댓값이어야 한다
const [N, M] = input[0].trim().split(" ").map(Number);
const map = input.slice(1).map((v) => v.trim().split(" ").map(Number));

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const cctvCoordinates = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if ([1, 2, 3, 4, 5].includes(map[i][j])) {
      cctvCoordinates.push([i, j, map[i][j]]);
    }
  }
}

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

function watch(x, y, dir, map) {
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

let minValue = Infinity;
function DFS(index, copiedMap) {
  // 한 방향 탐색 하면, 다음 cctv 탐색
  // index도 함께 전달해서 index가 cctv개수가 되면 return
  // return하면 탐색했던 것 원복하고, 방향 바꿔서 다시 탐색
  if (index === cctvCoordinates.length) {
    // 여기서 사각지대 개수 갱신(최솟값으로)
    let temp = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (copiedMap[i][j] === 0) temp++;
      }
    }
    minValue = Math.min(minValue, temp);
    return;
  }
  const [x, y, type] = cctvCoordinates[index];
  const originalMap = JSON.parse(JSON.stringify(copiedMap));

  for (const dirs of cctvDirections[type]) {
    for (const dir of dirs) {
      watch(x, y, dir, copiedMap);
    }
    DFS(index + 1, copiedMap);
    copiedMap = JSON.parse(JSON.stringify(originalMap));
  }
}

DFS(0, map);
console.log(minValue);
