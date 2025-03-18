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

const info = input[0].split(" ").map(Number);

const N = info[0];
const possibility = info.slice(1);
const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
possibility.forEach((v, i) => {
  directions[i].push(v / 100);
});

// 로봇은 N번의 행동을 취할 것이다
// 각 행동에서 로봇은 4개의 방향 중에 하나를 임의로 선택한다.
// 그리고 그 방향으로 한 칸 이동한다
// 같은 곳을 한번보다 많이 이동하지 않을 때, 로봇의 이동 경로가 단순하다고 한다.
// 로봇의 이동 경로가 단순할 확률을 구하는 프로그램을 작성하시오

const map = Array.from({ length: 2 * N + 1 }, () =>
  Array.from({ length: 2 * N + 1 }).fill(false)
);
let [x, y] = [N, N];
map[x][y] = true;

let answer = 0;
function DFS(x, y, p, count) {
  if (count === N) {
    answer += p;
    return;
  }

  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + directions[i][0], y + directions[i][1]];
    if (nx >= 0 && ny >= 0 && nx <= 2 * N && ny <= 2 * N) {
      if (!map[nx][ny] && directions[i][2]) {
        map[nx][ny] = true;

        DFS(nx, ny, p * directions[i][2], count + 1);
        map[nx][ny] = false;
      }
    }
  }
}

DFS(x, y, 1, 0);
console.log(answer);
