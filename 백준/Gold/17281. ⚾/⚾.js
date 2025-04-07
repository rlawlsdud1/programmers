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

const N = Number(input[0]);
const info = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
const visited = Array.from({ length: 10 }).fill(false);

visited[1] = true;

let answer = 0;
function BT(order) {
  if (order.length === 9) {
    const score = checkScore(order);
    answer = Math.max(answer, score);

    return;
  }

  if (order.length === 3) {
    order.push(1);
    BT(order);
    order.pop();
    return;
  }

  for (let i = 2; i <= 9; i++) {
    if (!visited[i]) {
      visited[i] = true;
      order.push(i);
      BT(order);
      order.pop();
      visited[i] = false;
    }
  }
}
BT([]);
console.log(answer);

function checkScore(order) {
  let currentNum = 1; // 현재 타석에 들어간 순서
  let currentInning = 1; // 현재 이닝
  let score = 0; // 현재 점수

  while (currentInning <= N) {
    // 이닝 새로 시작하면 아웃카운트랑 주자 상황 초기화
    let currentOutCnt = 0; // 현재 이닝의 아웃카운트
    let first = 0,
      second = 0,
      third = 0;

    while (currentOutCnt < 3) {
      // 한 타자에 대한 삼진, 안타, 2루타, 3루타, 홈런에 대한 처리
      const batterInfo = info[currentInning - 1][order[currentNum - 1] - 1];

      if (batterInfo === 0) {
        currentOutCnt++;
      } else if (batterInfo === 1) {
        score += third;
        third = second;
        second = first;
        first = 1;
      } else if (batterInfo === 2) {
        score += second + third;
        third = first;
        second = 1;
        first = 0;
      } else if (batterInfo === 3) {
        score += first + second + third;
        third = 1;
        second = 0;
        first = 0;
      } else if (batterInfo === 4) {
        score += first + second + third + 1;
        third = 0;
        second = 0;
        first = 0;
      }

      // 다음순서
      if (currentNum === 9) currentNum = 1;
      else currentNum++;
    }

    // 아웃카운트 차면 이닝 증가
    currentInning++;
  }

  return score;
}
