const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

const [N, S] = input[0].trim().split(" ").map(Number);
const numbers = input[1].split(" ").map(Number);

let left = 0;
let sum = 0;
let answer = Infinity;

for (let right = 0; right < N; right++) {
  sum += numbers[right];

  while (sum >= S) {
    answer = Math.min(answer, right - left + 1);
    sum -= numbers[left++];
  }
}

if (answer === Infinity) console.log(0);
else console.log(answer);
