const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

const givenStr = input[0].split("-");

let sum = givenStr[0]
  .split("+")
  .map(Number)
  .reduce((acc, cur) => acc + cur, 0);
for (let i = 1; i < givenStr.length; i++) {
  sum -= givenStr[i]
    .split("+")
    .map(Number)
    .reduce((acc, cur) => acc + cur, 0);
}
console.log(sum);
