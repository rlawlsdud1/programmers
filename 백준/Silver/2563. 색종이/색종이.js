const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

const N = Number(input[0]);
const info = input.slice(1).map((v) => v.trim().split(" ").map(Number));

const board = Array.from({ length: 100 }, () =>
  Array.from({ length: 100 }).fill(0)
);

function colorPrint(x, y) {
  for (let i = x - 1; i < x + 9; i++) {
    for (let j = y - 1; j < y + 9; j++) {
      board[i][j] = 1;
    }
  }
}

info.forEach((v) => {
  const [x, y] = v;
  colorPrint(x, y);
});

let count = 0;
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    if (board[i][j]) count++;
  }
}

console.log(count);
