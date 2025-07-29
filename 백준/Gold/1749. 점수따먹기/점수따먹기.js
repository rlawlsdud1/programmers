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
const matrix = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));

const prefixSum = Array.from({ length: N + 1 }, () =>
  Array.from({ length: M + 1 }).fill(0)
);

prefixSum[1][1] = matrix[0][0];
for (let j = 2; j <= M; j++) {
  prefixSum[1][j] += prefixSum[1][j - 1] + matrix[0][j - 1];
}

for (let i = 2; i <= N; i++) {
  prefixSum[i][1] += prefixSum[i - 1][1] + matrix[i - 1][0];
}

for (let i = 2; i <= N; i++) {
  for (let j = 2; j <= M; j++) {
    prefixSum[i][j] =
      prefixSum[i - 1][j] +
      prefixSum[i][j - 1] -
      prefixSum[i - 1][j - 1] +
      matrix[i - 1][j - 1];
  }
}

let max = -Infinity;
for (let x = 1; x <= N; x++) {
  for (let y = 1; y <= M; y++) {
    // (x * y) 크기의 부분행렬의 원소의 최댓값을 갱신할 것이다

    for (let i = x; i <= N; i++) {
      for (let j = y; j <= M; j++) {
        const temp =
          prefixSum[i][j] -
          (prefixSum[i - x][j] + prefixSum[i][j - y]) +
          prefixSum[i - x][j - y];

        max = Math.max(temp, max);
      }
    }
  }
}

console.log(max);
