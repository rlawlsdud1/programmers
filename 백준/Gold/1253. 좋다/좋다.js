const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

const N = Number(input[0]);
const numbers = input[1].split(" ").map(Number);
numbers.sort((a, b) => a - b);

// 어떤 수를 다른 두 수의 합으로 나타내려면
// 두 수는 둘다 어떤 수 보다 작아야 한다
// 음수 있어서 안되네..

// 포인터가 자기 자신을 가리키는 문제 때문에
// 분기를 마구 나눴으나
// 생각해보면 자기를 가리키면 그냥 넘어가면 될 듯?

let count = 0;
for (let i = 0; i < N; i++) {
  const target = numbers[i];

  let left = 0,
    right = N - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (left === i) {
      left++;
      continue;
    }
    if (right === i) {
      right--;
      continue;
    }

    if (sum === target) {
      count++;
      break;
    } else if (sum > target) {
      right--;
    } else {
      left++;
    }
  }
}

console.log(count);
