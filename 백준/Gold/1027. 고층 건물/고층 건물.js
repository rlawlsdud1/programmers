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
const info = input[1].split(" ").map(Number);

// i번째에서 i+n 번째가 보이는지 확인하려면,
// 1. i번째와 i+n 번째를 잇는 직선의 방정식을 구하고
// 2. i+1 ... i+n-1 까지의 점들의 x값에 대한 y값이 전부 조건을 만족해야 한다.
//  2-1) 하나라도 만족안하면 못본다. <- break
function getLinearEquation(first, second, target) {
  const [x1, y1] = first;
  const [x2, y2] = second;
  const [x, y] = target;

  if (y1 === y2) {
    if (y >= y1) return false;
    return true;
  } else {
    if (((y1 - y2) / (x1 - x2)) * (x - x1) + y1 > y) return true;
    return false;
  }
}

let answer = 0;

for (let i = 0; i < N; i++) {
  let count;

  if (i - 1 >= 0 && i + 1 < N) count = 2;
  else if (i - 1 >= 0 && i + 1 >= N) count = 1;
  else if (i - 1 < 0 && i + 1 < N) count = 1;
  else count = 0;

  const cur = [i, info[i]];

  for (let j = i - 2; j >= 0 && i - 2 >= 0; j--) {
    let isVisible = true;
    const second = [j, info[j]];
    for (let k = i - 1; k > j; k--) {
      if (!getLinearEquation(cur, second, [k, info[k]])) {
        isVisible = false;
        break;
      }
    }

    if (isVisible) count++;
  }

  for (let j = i + 2; j < N && i + 2 < N; j++) {
    let isVisible = true;
    const second = [j, info[j]];
    for (let k = i + 1; k < j; k++) {
      if (!getLinearEquation(cur, second, [k, info[k]])) {
        isVisible = false;
        break;
      }
    }

    if (isVisible) count++;
  }

  answer = Math.max(answer, count);
}

console.log(answer);
