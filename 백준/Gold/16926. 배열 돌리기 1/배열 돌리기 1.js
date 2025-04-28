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

const [N, M, R] = input[0].split(" ").map(Number);
const matrix = input.slice(1, 1 + N).map((v) => v.split(" "));

// matrix와 idx를 인자로 받는데, idx는 layer라고 생각하면 될 듯 하다
function rotateMatrix(matrix, idx) {
  let realRotateCnt = R % (2 * (N + M - 4 * idx - 2));

  while (realRotateCnt > 0) {
    const temp = matrix[idx][idx];
    // U
    for (let j = idx + 1; j < M - idx; j++) {
      matrix[idx][j - 1] = matrix[idx][j];
    }
    // R
    for (let i = idx + 1; i < N - idx; i++) {
      matrix[i - 1][M - idx - 1] = matrix[i][M - idx - 1];
    }
    // D
    for (let j = M - idx - 1; j > idx; j--) {
      matrix[N - idx - 1][j] = matrix[N - idx - 1][j - 1];
    }
    // L
    for (let i = N - idx - 2; i >= idx + 1; i--) {
      matrix[i + 1][idx] = matrix[i][idx];
    }
    // 마지막으로 시작지점을 그 다음에 반영
    matrix[idx + 1][idx] = temp;

    realRotateCnt--;
  }
}

let layerCnt = Math.min(N, M) / 2;
for (let idx = 0; idx < layerCnt; idx++) {
  rotateMatrix(matrix, idx);
}

matrix.forEach((row) => {
  console.log(row.join(" "));
});
