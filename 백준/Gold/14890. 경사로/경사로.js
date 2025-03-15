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

const [N, L] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));

// 한 줄에 대해 가능한 path 인지 확인하는 함수
function isPossible(arr) {
  // 경사로를 놓은적이 있는지를 기록하는 배열
  const viisted = Array.from({ length: arr.length }).fill(false);

  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i + 1] - arr[i];

    if (diff === 0) continue;
    if (Math.abs(diff) >= 2) return false;
    if (diff === 1) {
      // 오르막 설치해야함
      // j는 배열의 인덱스와는 무관하다
      for (let j = 0; j < L; j++) {
        if (arr[i] !== arr[i - j] || viisted[i - j] || i - j < 0) return false;
        viisted[i - j] = true;
      }
    } else if (diff === -1) {
      // 내리막 설치해야함
      for (let j = 1; j <= L; j++) {
        if (arr[i + 1] !== arr[i + j] || viisted[i + j] || i + j >= arr.length)
          return false;
        viisted[i + j] = true;
      }
    }
  }

  return true;
}

let answer = 0;
for (let i = 0; i < N; i++) {
  if (isPossible(map[i])) answer++;
}

for (let j = 0; j < N; j++) {
  const path = [];
  for (let i = 0; i < N; i++) {
    path.push(map[i][j]);
  }
  if (isPossible(path)) answer++;
}
console.log(answer);
