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

// 가장 처음에 아기 상어의 크기는 2이고,
// 아기 상어는 1초에 상하좌우로 인접한 한 칸씩 이동한다.
// 아기 상어는 자신의 크기보다 큰 물고기가 있는 칸은 지나갈 수 없고,
// 나머지 칸은 모두 지나갈 수 있다
// 아기 상어는 자신의 크기보다 작은 물고기만 먹을 수 있다.
// 따라서, 크기가 같은 물고기는 먹을 수 없지만, 그 물고기가 있는 칸은 지나갈 수 있다.

// 먹을 수 있는 물고기가 1마리라면, 그 물고기를 먹으러 간다.
// 먹을 수 있는 물고기가 1마리보다 많다면, 거리가 가장 가까운 물고기를 먹으러 간다
//  물고기가 있는 칸으로 이동할 때, 지나야하는 칸의 개수의 최솟값이다.
//  거리가 가까운 물고기가 많다면, 가장 위에 있는 물고기,
//  그러한 물고기가 여러마리라면, 가장 왼쪽에 있는 물고기를 먹는다.

// 아기 상어는 자신의 크기와 같은 수의 물고기를 먹을 때 마다 크기가 1 증가한다.
// 예를 들어, 크기가 2인 아기 상어는 물고기를 2마리 먹으면 크기가 3이 된다.

// 몇 초 동안 엄마 상어에게 도움을 요청하지 않고 물고기를 잡아먹을 수 있는지

const N = Number(input[0]);
const map = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
// 재료
// map에 물고기가 몇마리인지 확인하는 함수
// 현재 아기 상어의 크기와, 먹은 마릿수를 관리
// 지금 아기 상어의 상태에 따라 먹을 수 있는 물고기를 찾는 함수

let count = 0;
let canContinue = true;
const babySharkState = [2, 0]; // 크기, 먹은 수
while (canContinue) {
  let currentPosition = findBaby(map);
  map[currentPosition[0]][currentPosition[1]] = 0;

  const preys = findPrey(babySharkState[0], map);
  if (preys.length === 0) canContinue = false;

  // 아기상어의 현재 위치, 먹을 수 있는 애들을 인자로 받아,
  // 먹이까지 거리가 가장 가까운 애가 누구인지
  // 그러한 물고기가 여러마리라면 가장 위에있는 물고기(x값이 가장 작은)
  // 그러한 물고기가 여러마리라면 가장 왼쪽에 있는 물고기(y값이 가장 작은)
  const copiedMap = JSON.parse(JSON.stringify(map));

  const nextPrey = findShortestPrey(
    babySharkState[0],
    currentPosition,
    preys,
    copiedMap,
    directions
  );
  if (!nextPrey) {
    // 여기 걸리는 경우는 먹을 수 있는 먹이가 있긴 하지만 그 먹이로 향할 수 없을 때
    canContinue = false;
  } else {
    map[nextPrey[0]][nextPrey[1]] = 9;
    babySharkState[1] += 1;

    // 레벨업
    if (babySharkState[1] === babySharkState[0]) {
      babySharkState[0] += 1;
      babySharkState[1] = 0;
    }

    count += nextPrey[2];
  }
}
console.log(count);

function findBaby(map) {
  let currentPosition = []; // 아기상어의 현재 위치
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === 9) {
        currentPosition = [i, j];
        break;
      }
    }
  }

  return currentPosition;
}

function findPrey(sharkWeight, map) {
  const preys = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] < sharkWeight && map[i][j] > 0) {
        preys.push([i, j]);
      }
    }
  }
  return preys;
}

function findShortestPrey(
  babySharkWeight,
  currentPosition,
  preys,
  map,
  directions
) {
  const queue = [];
  const [x, y] = currentPosition;
  queue.push([x, y, 0]); // [ x, y, 이동거리 ]

  preys.forEach((v) => {
    const [x, y] = v;
    map[x][y] = -1; // 먹을 수 있는 먹이를 -1으로 표현
  });

  const visited = Array.from({ length: N }, () =>
    Array.from({ length: N }).fill(false)
  );
  visited[x][y] = true;

  const candidate = [];
  while (queue.length) {
    const [x, y, distance] = queue.shift();

    if (map[x][y] === -1) candidate.push([x, y, distance]);

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < N &&
        !visited[nx][ny] &&
        map[nx][ny] <= babySharkWeight
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny, distance + 1]);
      }
    }
  }
  // candidate 는 먹을 수 있는 애들에 대한 정보를 담은 배열이다

  let minDistance = Infinity;
  candidate.forEach((v) => {
    minDistance = Math.min(minDistance, v[2]);
  });
  const filteredCandidate = candidate.filter((v) => v[2] === minDistance);
  filteredCandidate.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });

  return filteredCandidate[0];
}
