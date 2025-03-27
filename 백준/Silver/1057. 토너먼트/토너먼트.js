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

let [N, A, B] = input[0].split(" ").map(Number);

let count = 0;

while (1) {
  count++;
  if (A > B) {
    if (A % 2 === 0 && A - B === 1) {
      break;
    }
  } else {
    if (B % 2 === 0 && B - A === 1) {
      break;
    }
  }
  A = Math.ceil(A / 2);
  B = Math.ceil(B / 2);
}
console.log(count);
