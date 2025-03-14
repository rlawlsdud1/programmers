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

const [N, L] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));

function isPossible(arr) {
  // visited 배열은 다리를 놓은적이 있는지를 기록하는 배열
  const visited = Array.from({ length: arr.length }).fill(false);

  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i + 1] - arr[i];

    if (Math.abs(diff) >= 2) return false;
    if (diff === 0) continue;

    if (diff === 1) {
      // 오르막
      for (let j = 0; j < L; j++) {
        if (i - j < 0 || visited[i - j] || arr[i] !== arr[i - j]) return false;
        visited[i - j] = true;
      }
    } else if (diff === -1) {
      // 내리막
      for (let j = 1; j <= L; j++) {
        if (i + j >= arr.length || visited[i + j] || arr[i + 1] !== arr[i + j])
          return false;
        visited[i + j] = true;
      }
    }
  }
  // loop 을 돌아도 별 일 안생기면 가능
  return true;
}

let count = 0;
for (let i = 0; i < N; i++) {
  if (isPossible(map[i])) count++;
}

// 열 뽑는 로직 따로 외워야 할 듯
for (let j = 0; j < N; j++) {
  const column = [];
  for (let i = 0; i < N; i++) {
    column.push(map[i][j]);
  }
  if (isPossible(column)) count++;
}

console.log(count);
