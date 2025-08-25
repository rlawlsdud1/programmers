const { count } = require("console");
const fs = require("fs");
const path = require("path");
const { CLIENT_RENEG_LIMIT } = require("tls");
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
const info = input.slice(1, 1 + N * N).map((v) => v.split(" ").map(Number));
const likeObj = {};

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const visited = Array.from({ length: N }, () => Array.from({ length: N }));

const first = info[0][0];
visited[1][1] = first;
likeObj[first] = info[0].slice(1);

// 각 학생이 좋아하는 학생 4명도 모두 조사
// 정해진 순서대로 학생의 자리를 정하려고 한다
// def 인접) 맨해튼 거리 = 1
for (let i = 1; i < N * N; i++) {
  const target = info[i][0];
  const friends = info[i].slice(1);

  likeObj[target] = friends;

  const candidate1 = []; // 비어있는 곳
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      if (!visited[x][y]) candidate1.push([x, y]);
    }
  }

  let maxCnt = -Infinity;
  let candidate2 = [];
  candidate1.map((v) => {
    const [x, y] = v;

    let count = 0;
    for (const direction of directions) {
      const [nx, ny] = [x + direction[0], y + direction[1]];

      if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
        if (friends.includes(visited[nx][ny])) count++;
      }
    }

    if (maxCnt < count) {
      maxCnt = count;
      candidate2 = [[x, y]];
    } else if (maxCnt === count) {
      candidate2.push([x, y]);
    }
  });

  maxCnt = -Infinity;
  let candidate3 = [];
  candidate2.map((v) => {
    const [x, y] = v;

    let count = 0;
    for (const direction of directions) {
      const [nx, ny] = [x + direction[0], y + direction[1]];

      if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
        if (!visited[nx][ny]) {
          count++;
        }
      }
    }

    if (maxCnt < count) {
      maxCnt = count;
      candidate3 = [[x, y]];
    } else if (maxCnt === count) {
      candidate3.push([x, y]);
    }
  });

  candidate3.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });

  visited[candidate3[0][0]][candidate3[0][1]] = target;
}

let answer = 0;
for (let x = 0; x < N; x++) {
  for (let y = 0; y < N; y++) {
    const target = visited[x][y];
    const friends = likeObj[target];

    let count = 0;
    for (const direction of directions) {
      const [nx, ny] = [x + direction[0], y + direction[1]];
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < N &&
        friends.includes(visited[nx][ny])
      ) {
        count++;
      }
    }

    if (count === 4) answer += 1000;
    else if (count === 3) answer += 100;
    else if (count === 2) answer += 10;
    else if (count === 1) answer += 1;
  }
}

console.log(answer);
