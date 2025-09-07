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

// 영수가 서로 다른 세개 생각
// 민혁이는 서로다른 세개를 영수에게 묻는다
// 숫자가 동일한 위치에 있으면 스트라이크 한번
// 숫자가 있지만 다른위치에 있으면 볼

// 3 스트라이크가 되면 게임 끝 -> 이러면 하나로 좁혀지는거고
//

let answer = 0;
for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= 9; j++) {
    for (let k = 1; k <= 9; k++) {
      if (new Set([i, j, k]).size === 3) {
        if (guessNum([i, j, k])) answer++;
      }
    }
  }
}

function guessNum(candidate) {
  let isPossible = true;

  for (const guess of info) {
    let [num, strike, ball] = guess;
    num = String(num).split("").map(Number);

    let tempS = 0,
      tempB = 0;

    let strikeIdx = [];

    for (let i = 0; i < 3; i++) {
      if (candidate[i] === num[i]) {
        tempS++;
        strikeIdx.push(i);
      }
    }

    if (strike === 3) {
      console.log(1);
      process.exit(0);
    }

    const numSet = new Set();
    const candidateSet = new Set();

    for (let i = 0; i < 3; i++) {
      if (strikeIdx.includes(i)) continue;

      numSet.add(num[i]);
      candidateSet.add(candidate[i]);
    }

    numSet.forEach((v) => {
      if (candidateSet.has(v)) {
        tempB++;
      }
    });

    if (strike !== tempS || ball !== tempB) {
      isPossible = false;
      break;
    }
  }

  if (isPossible) return true;
  else return false;
}

console.log(answer);
