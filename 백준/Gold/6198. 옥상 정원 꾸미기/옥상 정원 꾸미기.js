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

// 자신이 위치한 빌딩보다 높거나 같은 빌딩이 있으면
// 그 다음에 있는 모든 빌딩의 옥상은 보지 못한다.
const N = Number(input[0]);
const heights = input.slice(1).map((v) => Number(v));

// 마지막에 있는 관리인은 어차피 오른쪽에 빌딩이 없어서 못봄
// loop range setting
let answer = 0;
for (let i = 0; i < N - 1; i++) {
  const cur = heights[i];
  let count = 0;
  for (let j = i + 1; j < N; j++) {
    if (cur > heights[j]) {
      count++;
    } else {
      break;
    }
  }
  answer += count;
}
console.log(answer);
