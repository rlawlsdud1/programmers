const fs = require("fs");
// 제출할때는 '/dev/stdin' 로 바꾸기
let input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map((v) => v.trim());

const [N, M] = input[0].split(" ").map(Number);
const maze = input.slice(1).map((v) => v.split("").map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const queue = [];
queue.push([0, 0, 1]);
maze[0][0] = 0;

while (queue.length) {
  const [x, y, count] = queue.shift();
  if (x === N - 1 && y === M - 1) console.log(count);

  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx < N && ny < M && maze[nx][ny]) {
      queue.push([nx, ny, count + 1]);
      maze[nx][ny] = 0;
    }
  }
}
