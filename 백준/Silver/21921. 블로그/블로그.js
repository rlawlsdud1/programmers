const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

const [N, X] = input[0].trim().split(" ").map(Number);
const visitors = input[1].split(" ").map(Number);

let left = 0;
let right = X - 1;

// initial value setting
let sum = 0;
for (let i = 0; i < X; i++) {
  sum += visitors[i];
}

let max = sum;
let count = 1;
while (right < N - 1) {
  sum -= visitors[left++];
  sum += +visitors[++right];

  if (sum === max) count++;
  if (sum > max) {
    max = sum;
    count = 1;
  }
}
if (!max) console.log("SAD");
else {
  console.log(max);
  console.log(count);
}
