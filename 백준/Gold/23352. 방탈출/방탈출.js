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

const [N, M] = input[0].split(" ");
const map = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const answer = [0, 0]; // [경로 길이, 그 때의 끝 방 합]

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const visited = Array.from({ length: N }, () =>
      Array.from({ length: M }).fill(false)
    );

    if (map[i][j]) {
      // 탐색 시작
      visited[i][j] = true;

      const queue = [];
      queue.push([i, j, map[i][j], 0, 1]); // 좌표, 경로 시작 값, 경로 끝 값, 경로 길이

      while (queue.length) {
        const [x, y, startValue, endValue, pathLength] = queue.shift();

        if (pathLength > answer[0]) {
          answer[0] = pathLength;
          answer[1] = startValue + endValue;
        } else if (pathLength === answer[0]) {
          if (startValue + endValue > answer[1]) {
            answer[1] = startValue + endValue;
          }
        }

        for (const direction of directions) {
          const [nx, ny] = [x + direction[0], y + direction[1]];

          if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
            if (map[nx][ny] && !visited[nx][ny]) {
              visited[nx][ny] = true;
              queue.push([nx, ny, startValue, map[nx][ny], pathLength + 1]);
            }
          }
        }
      }
    }
  }
}

console.log(answer[1]);
