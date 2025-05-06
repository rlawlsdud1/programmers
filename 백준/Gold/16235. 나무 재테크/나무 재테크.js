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

// 봄에는 나무가 자신의 나이만큼 양분을 먹고, 나이가 1 증가한다.
// 하나의 칸에 여러 개의 나무가 있다면, 나이가 어린 나무부터 양분을 먹는다.
// 땅에 양분이 부족해 자신의 나이만큼 양분을 먹을 수 없는 나무는 양분을 먹지 못하고 즉시 죽는다.

// 여름에는 봄에 죽은 나무가 양분으로 변하게 된다.
// 각각의 죽은 나무마다 나이를 2로 나눈 값이 나무가 있던 칸에 양분으로 추가된다. 소수점 아래는 버린다.

// 가을에는 나무가 번식한다.
// 번식하는 나무는 나이가 5의 배수이어야 하며, 인접한 8개의 칸에 나이가 1인 나무가 생긴다.

// 겨울에는 S2D2가 땅을 돌아다니면서 땅에 양분을 추가한다
// 각 칸에 추가되는 양분의 양은 A[r][c]이고, 입력으로 주어진다.

// K년이 지난 후 상도의 땅에 살아있는 나무의 개수를 구하는 프로그램을 작성하시오.

const [N, M, K] = input[0].split(" ").map(Number);
const A = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number)); // 돌아다니며 양분 추가하는 기계
const trees = input
  .slice(1 + N, 1 + N + M)
  .map((v) => v.split(" ").map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
];

// 처음에는 양분이 모든 칸에 5만큼 들어있다.
const ground = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => [5, []])
);
// 각 원소의 첫번째 원소는 양분, 두번째는 나무 status

trees.forEach((v) => {
  const [x, y, age] = v;
  ground[x - 1][y - 1][1].push(age);
});

let year = 0;
while (year < K) {
  // 봄
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      ground[i][j][1].sort((a, b) => a - b); // 어린 순으로 정렬
      const treeCnt = ground[i][j][1].length;
      let remain = ground[i][j][0];
      let aliveCnt = 0;
      let toBeNourished = 0;

      for (let k = 0; k < treeCnt; k++) {
        if (ground[i][j][1][k] <= remain) {
          remain -= ground[i][j][1][k]; // 잔여 양분이 나이만큼 줄어든다
          ground[i][j][1][k] += 1; // 그러고 1살을 더 먹는다
          aliveCnt++;
        } else {
          toBeNourished += Math.floor(ground[i][j][1][k] / 2);
          // remain += Math.floor(ground[i][j][1][k] / 2); 여름꺼 여기서 처리 하면 안된다
        }
      }
      remain += toBeNourished;

      ground[i][j][1] = ground[i][j][1].slice(0, aliveCnt);
      ground[i][j][0] = remain;
    }
  }

  // 가을
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const treeCnt = ground[i][j][1].length;
      for (let k = 0; k < treeCnt; k++) {
        if (ground[i][j][1][k] >= 5 && ground[i][j][1][k] % 5 === 0) {
          makeTree(ground, i, j);
        }
      }
    }
  }

  // 겨울
  giveFood(ground);

  year++;
}

console.log(countTrees(ground));

function makeTree(ground, x, y) {
  for (const direction of directions) {
    const [nx, ny] = [x + direction[0], y + direction[1]];
    if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
      ground[nx][ny][1].push(1);
    }
  }
}

function giveFood(ground) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      ground[i][j][0] += A[i][j];
    }
  }
}

function countTrees(ground) {
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      count += ground[i][j][1].length;
    }
  }

  return count;
}
