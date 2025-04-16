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

// 변의 방향에서 동쪽은 1, 서쪽은 2, 남쪽은 3, 북쪽은 4로 나타낸다.
// 육각형의 임의의 한 꼭짓점에서 출발하여 반시계방향으로 둘레를 돌면서
// 지나는 변의 방향과 길이

// 동서를 같게, 남북을 같게 하면 다음과 같다.
// 원래 보정 길이
// 4     3    50
// 2     1    160
// 3     3    30
// 1     1    60
// 3     3    20
// 1     1    100
// 313 이 구간이 빠지는 부분
// 1,2 번 인덱스에 해당하는 원소 곱한게 빠진 부분 넓이

// 우선 전체 넓이는 가장 긴 것 끼리 곱 160 * 50 = 8000
// 빠진 부분 넓이는 60 * 20 = 1200
// 따라서 6800
const K = Number(input[0]);
const info = input.slice(1, 7).map((v) => v.split(" ").map(Number));

let a, b; // 빠지는 부분의 가로, 세로 길이
const copiedInfo = JSON.parse(JSON.stringify(info));
const extendedInfo = [...copiedInfo, ...copiedInfo];

if (
  extendedInfo[0][0] === extendedInfo[2][0] &&
  extendedInfo[1][0] !== extendedInfo[3][0]
) {
  a = extendedInfo[0][1];
  b = extendedInfo[1][1];
} else {
  for (let i = 0; i < 12; i++) {
    if (extendedInfo[i][0] === extendedInfo[i + 2][0]) {
      a = extendedInfo[i + 1][1];
      b = extendedInfo[i + 2][1];
      break;
    }
  }
}

info.forEach((v, i) => {
  const [d, _] = v;
  if (d === 4) info[i][0] = 3;
  else if (d === 2) info[i][0] = 1;
});

info.sort((a, b) => {
  if (a[0] === b[0]) {
    return a[1] - b[1];
  }
  return a[0] - b[0];
});

// 전체 가로, 세로 길이
const A = info[2][1];
const B = info[5][1];

const S = A * B - a * b;
console.log(S * K);
