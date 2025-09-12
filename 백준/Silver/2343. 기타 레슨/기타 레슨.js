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
const numbers = input[1].split(" ").map(Number);

let maxValue = Math.max(...numbers) * N;
let minValue = Math.min(...numbers);

let left = minValue,
  right = maxValue * N;

let answer = Infinity;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  let isPossible = true;
  // 해당 블루레이 크기로 가능한지 체크
  let sum = 0;
  let count = 1;
  for (let i = 0; i < N; i++) {
    if (numbers[i] > mid) {
      isPossible = false;
      break;
    }

    if (sum + numbers[i] > mid) {
      sum = numbers[i];
      count++;
    } else if (sum + numbers[i] < mid) {
      sum += numbers[i];
    } else {
      sum = 0;
      if (i !== N - 1) count++;
    }
  }

  if (count > M) isPossible = false;
  else if (count === M && sum > mid) isPossible = false;

  if (isPossible) {
    answer = Math.min(answer, mid);
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log(answer);
