const { count } = require("console");
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

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((v) => v.split("").map(Number));

class Queue {
  constructor() {
    this.elements = {};
    this.head = 0;
    this.tail = 0;
  }

  push(element) {
    this.elements[this.tail] = element;
    this.tail++;
  }

  shift() {
    const temp = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return temp;
  }

  getLength() {
    return this.tail - this.head;
  }
}

// 0은 이동할 수 있는 곳
// 1은 벽이 있는 곳
// (1,1) 에서 (N,M)으로 최단 경로로 이동하고자 한다.
// 시작하는 칸과 끝나는 칸도 포함해서 센다.

// 이동하는 도중에 한 개의 벽을 부수고 이동하는 것이 더 짧아지면,
// 벽을 한 개까지 부수고 이동해도 된다

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => [false, false])
);
// visited[i][j][0] 은 (i,j)에서 벽을 안부순 애가 방문 했는지
// visited[i][j][1] 은 (i,j)에서 벽을 부순 애가 방문 했는지

const queue = new Queue();
queue.push([0, 0, 1, false]); // 좌표, 칸 수, 오는동안 벽 부순적 있는지
visited[0][0][0] = true;

let answer;
while (queue.getLength()) {
  const [x, y, count, wallBreak] = queue.shift();
  if (x === N - 1 && y === M - 1) {
    answer = count;
    break;
  }

  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
      if (wallBreak) {
        if (map[nx][ny] === 0 && !visited[nx][ny][1]) {
          visited[nx][ny][1] = true;
          queue.push([nx, ny, count + 1, wallBreak]);
        }
      } else {
        if (map[nx][ny] === 0 && !visited[nx][ny][0]) {
          visited[nx][ny][0] = true;
          queue.push([nx, ny, count + 1, wallBreak]);
        } else if (map[nx][ny] === 1 && !visited[nx][ny][1]) {
          visited[nx][ny][1] = true;
          queue.push([nx, ny, count + 1, !wallBreak]);
        }
      }
    }
  }
}

console.log(answer ? answer : -1);
