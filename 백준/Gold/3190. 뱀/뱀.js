const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

input = input.map((v) => v.trim());

// 사과를 먹으면 뱀 길이가 늘어난다.
// 뱀의 초기값은 1
// 뱀은 처음에 오른쪽을 향한다
// 매 초마다 이동을 하며 다음과 같은 규칙을 따른다
//  1) 몸길이를 늘려 머리를 다음칸에 위치시킨다
//  2) 벽이나 자기자신의 몸과 부딪히면 게임 끝
//  3) 사과가 있다면 그 칸의 사과는 사라지고 꼬리는 움직이지 않는다
//  4) 사과가 없다면 몸길이를 줄여 꼬리가 위치한 칸을 비운다.
//     즉, 몸길이는 변하지 않는다.

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
const N = Number(input[0]);
const K = Number(input[1]);
const apples = input.slice(2, K + 2).map((v) => v.split(" ").map(Number));
const L = Number(input[K + 2]);
const info = input.slice(K + 3).map((v) => v.split(" "));
// [X, C]는 게임 시작 후 X초 뒤에 움직일 방향
const timeToChange = Array.from({ length: Number(info[L - 1][0]) + 1 }).fill(0);
info.forEach((v) => {
  timeToChange[Number(v[0])] = v[1];
});

const map = Array.from({ length: N }, () => Array.from({ length: N }).fill(0));

apples.forEach((v) => {
  const [x, y] = v;
  map[x - 1][y - 1] = 1;
});

let [x, y] = [0, 0]; // (x, y)는 뱀의 머리 좌표
let count = 0;
let curDirection = 0;
const snakeState = [];
snakeState.push("0,0");
let snakeLength = 1;

while (1) {
  count++;
  const [nx, ny] = [
    x + directions[curDirection][0],
    y + directions[curDirection][1],
  ];

  if (nx < 0 || ny < 0 || nx >= N || ny >= N) break;
  // 몸박하는 경우
  if (snakeState.includes(`${nx},${ny}`)) break;

  // 사과 먹으면 몸 커지고
  if (map[nx][ny] === 1) {
    map[nx][ny] = 0;
    snakeLength++;
  }
  // 어쨌든 가니까 일단 넣고
  snakeState.push(`${nx},${ny}`);

  if (snakeLength < snakeState.length) {
    snakeState.shift();
  }

  x = nx;
  y = ny;

  if (timeToChange[count]) {
    // 방향 전환
    const direction = timeToChange[count];
    if (direction === "L") {
      curDirection = (curDirection + 3) % 4;
    } else {
      curDirection = (curDirection + 1) % 4;
    }
  }
}

console.log(count);
