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
const map = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));

// map을 돌며 0인 곳이 내부 공기인지 외부공기인지를 알아야 할 것 같다
// 내부 공기인지 확인하는 법은
// 0인 곳에서 네방향을 쭉 뚫고 갔을 때, 네 방향 전부 치즈를 만난다면 내부 공기이다
// 그렇게 내부 공기 외부 공기를 체크하고
// map을 돌며 1인 곳이 외부 공기와 두 군데 이상 닿아 있는지 확인하고 기록한다.(바로 반영X)
// 두 군데 이상 맞닿아 있는 곳을 한번에 다 지운다.
// map에 치즈가 남아있는지 확인하고, 남아있다면 count++ 하는 것을 반복한다

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
function checkOuterAir(x, y, map) {
  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx < N && ny < M && map[nx][ny] === 0) {
      map[nx][ny] = 2;
      checkOuterAir(nx, ny, map);
    }
  }
}

function checkMelting(i, j, map) {
  // 가장자리에는 치즈가 놓이지 않는다고 했으므로,
  // 범위를 벗어나는 곳은 신경쓰지 않아도 된다.
  let count = 0;
  for (let k = 0; k < 4; k++) {
    const [nx, ny] = [i + directions[k][0], j + directions[k][1]];

    if (nx >= 0 && ny >= 0 && nx < N && ny < M && map[nx][ny] === 2) {
      count++;
    }
  }

  if (count >= 2) return true;
  else return false;
}

let answer = 0;
while (1) {
  let canContinue = false;
  // 남은 치즈가 있는지 확인
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 1) canContinue = true;
    }
  }

  if (!canContinue) break;

  answer++;

  checkOuterAir(0, 0, map);
  // 표시 끝나면 다시 map 돌며 외부 공기와 두 군데 이상 접해있는지 확인
  // 그런 곳을 기록하기
  const candidate = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 1 && checkMelting(i, j, map)) {
        candidate.push([i, j]);
      }
    }
  }

  // candidate 순회하며 치즈 다 없애고,
  candidate.forEach((v) => {
    const [x, y] = v;
    map[x][y] = 0;
  });
  // 외부 공기 다시 0으로 바꾸기
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 2) map[i][j] = 0;
    }
  }
}
console.log(answer);

// 내부 공기 체크 함수가 잘못 됨.
// 그냥 DFS 돌리는게 나을 듯
// 0,0에서 시작. (가장자리는 항상 치즈가 없으므로)
