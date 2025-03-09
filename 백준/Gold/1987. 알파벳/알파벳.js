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

const [R, C] = input[0].split(" ").map(Number);
const board = input.slice(1).map((v) => v.split(""));

// 좌측 상단 칸에 말이 놓여있다
// 말은 상하좌우로 이동할 수 있다
// 새롭게 이동할 칸에는 지금까지 지나온 알파벳과 달라야 한다
// = 경로에 속한 알파벳들은 unique해야 한다.
// 최대 몇칸 갈 수 있는지 구하라

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const visited = Array.from({ length: R }, () =>
  Array.from({ length: C }).fill(false)
);

function DFS(x, y, pathSet) {
  answer = Math.max(answer, pathSet.size);
  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx < R && ny < C) {
      if (!visited[nx][ny] && !pathSet.has(board[nx][ny])) {
        visited[nx][ny] = true;
        pathSet.add(board[nx][ny]);

        DFS(nx, ny, pathSet);
        visited[nx][ny] = false;
        pathSet.delete(board[nx][ny]);
      }
    }
  }
}

let answer = 0;
const pathSet = new Set();
pathSet.add(board[0][0]);
visited[0][0] = true;
DFS(0, 0, pathSet);
console.log(answer);
