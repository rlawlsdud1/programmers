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

const t = Number(input[0]);
const testCases = input.slice(1).map((v) => v.split(" ").map(Number));

for (let i = 0; i < t; i++) {
  const [n, K] = testCases[i * 2];
  const numbers = testCases[i * 2 + 1];
  numbers.sort((a, b) => a - b);

  let left = 0,
    right = numbers.length - 1,
    count = 0,
    temp = Infinity;
  // K와 얼마나 가까운지를 체크하는 것이다
  // = 차이가 작아야 한다
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    let difference = K - sum;

    if (Math.abs(temp) === Math.abs(difference)) {
      count++;
    } else if (Math.abs(temp) > Math.abs(difference)) {
      count = 1;
      temp = K - sum;
    }

    if (difference > 0) left++;
    else right--;
  }

  console.log(count);
}
