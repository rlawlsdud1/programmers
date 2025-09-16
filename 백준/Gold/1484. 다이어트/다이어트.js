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

const G = Number(input[0]);
const answer = [];
let R = 1,
  C = 2;

while (C ** 2 - R ** 2 <= 1_000_000) {
  const newG = C ** 2 - R ** 2;

  if (newG > G) {
    R++;
  } else if (newG === G) {
    answer.push(C);
    C++;
  } else {
    C++;
  }
}

if (!answer.length) console.log(-1);
else console.log(answer.join("\n"));
