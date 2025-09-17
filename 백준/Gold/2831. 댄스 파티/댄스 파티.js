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
const male = input[1].split(" ").map(Number);
const female = input[2].split(" ").map(Number);

const negativeMale = male.filter((v) => v < 0).sort((a, b) => b - a);
const positiveFemale = female.filter((v) => v > 0).sort((a, b) => a - b);

const negativeFemale = female.filter((v) => v < 0).sort((a, b) => b - a);
const positiveMale = male.filter((v) => v > 0).sort((a, b) => a - b);

let answer = 0;
let m = 0,
  f = 0;

while (m < N && f < N) {
  if (Math.abs(negativeMale[m]) > Math.abs(positiveFemale[f])) {
    answer++;
    m++;
    f++;
  } else m++;
}

m = 0;
f = 0;
while (m < N && f < N) {
  if (Math.abs(negativeFemale[f]) > Math.abs(positiveMale[m])) {
    answer++;
    m++;
    f++;
  } else f++;
}

console.log(answer);
