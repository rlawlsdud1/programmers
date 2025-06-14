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

const [R, C] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + R).map((v) => v.split(""));
const everyWords = [];

// Row check
for (let i = 0; i < R; i++) {
  const curRow = map[i];

  const words = curRow
    .join("")
    .split("#")
    .filter((v) => v.length >= 2);

  words.forEach((w) => everyWords.push(w));
}

// Column check
for (let j = 0; j < C; j++) {
  const curCol = [];

  for (let i = 0; i < R; i++) {
    curCol.push(map[i][j]);
  }

  const words = curCol
    .join("")
    .split("#")
    .filter((v) => v.length >= 2);

  words.forEach((w) => everyWords.push(w));
}

everyWords.sort();
console.log(everyWords[0]);
