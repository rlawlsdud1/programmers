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

const N = Number(input[0]);
const info = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));

info.sort((a, b) => {
  if (a[0] === b[0]) return a[1] - b[1];

  return a[0] - b[0];
});

let [previousX, previousY] = info[0];
let answer = previousY - previousX;

for (let i = 1; i < N; i++) {
  const [x, y] = info[i];
  if (x >= previousY) {
    answer += y - x;
  } else {
    if (y >= previousY) {
      answer += y - previousY;
    }
  }
  previousY = Math.max(y, previousY);
}

console.log(answer);
