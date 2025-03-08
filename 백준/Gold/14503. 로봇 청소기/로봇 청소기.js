const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

input = input.map((v) => v.trim().split(" ").map(Number));
const [N, M] = input[0];
let [x, y, direction] = input[1];

const directions = {
  0: [-1, 0],
  1: [0, 1],
  2: [1, 0],
  3: [0, -1],
};

const map = input.slice(2);

let isContinue = true;
let count = 0;

// 청소한 곳을 벽으로 만드는게 아니다.
while (isContinue) {
  if (!map[x][y]) {
    count++;
    map[x][y] = 2;
  }

  let hasEmpty = false;

  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx < N && ny < M && !map[nx][ny]) {
      // 빈칸이 있는 경우
      // 현재 바라보는 방향을 기준으로 반시계 방향으로 90도 회전
      // 반시계 90도는 시계 270도 와 같다
      // 반복문 종료
      direction = (direction + 3) % 4;
      hasEmpty = true;
      break;
      // 빈칸이 없다면 이 조건문을 만나지 않을 것이고,
      // hasEmpty는 false로 유지된다
    }
  }

  if (hasEmpty) {
    // 빈칸이 있는 경우
    const [nx, ny] = [
      x + directions[direction][0],
      y + directions[direction][1],
    ];
    // 바라보는 방향으로 전진
    if (nx >= 1 && ny >= 1 && nx < N - 1 && ny < M - 1 && !map[nx][ny]) {
      x = nx;
      y = ny;
    }
  } else {
    // 빈칸이 없는 경우
    const [nx, ny] = [
      x - directions[direction][0],
      y - directions[direction][1],
    ];
    // 방향 유지한 채로 한칸 후진(가능하다면)
    if (
      nx >= 1 &&
      ny >= 1 &&
      nx < N - 1 &&
      ny < M - 1 &&
      map[nx][ny] === (0 || 2)
    ) {
      x = nx;
      y = ny;
    } else {
      // 뒤쪽이 벽이면 작동 끝
      isContinue = false;
    }
  }
}
console.log(count);
