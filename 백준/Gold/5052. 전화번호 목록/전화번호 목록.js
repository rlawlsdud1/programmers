const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.trim());

// 전화번호 목록이 일관성을 유지하려면,
// 한 번호가 다른 번호의 접두어인 경우가 없어야 한다.

const t = Number(input[0]);
let info = input.slice(1);

for (let i = 0; i < t; i++) {
  const n = Number(info[0]);
  const numbers = info.slice(1, 1 + n);
  numbers.sort();

  let isPossible = true;
  for (let j = 0; j < n - 1; j++) {
    if (numbers[j + 1].startsWith(numbers[j])) {
      isPossible = false;
      break;
    }
  }

  console.log(isPossible ? "YES" : "NO");

  info = info.slice(n + 1);
}
