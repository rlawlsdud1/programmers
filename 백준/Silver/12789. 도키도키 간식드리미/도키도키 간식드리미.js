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

// 번호 순으로 나가야 한다.
// 번호는 연속된 자연수로 주어진다.
let count = 1;
let tempStack = [];

for (let i = 0; i < N; i++) {
  tempStack.push(info[i]);

  while (1) {
    if (tempStack[tempStack.length - 1] === count) {
      count++;
      tempStack.pop();
    } else {
      break;
    }
  }
}
console.log(!tempStack.length ? "Nice" : "Sad");
