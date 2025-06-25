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

const numOfTC = Number(input[0]);
const info = input.slice(1).map((v) => v.split(" ").map(Number));
let idx = 0;

for (let i = 0; i < numOfTC; i++) {
  const [N, M] = info[idx++];
  const weights = info[idx++];

  let count = 0;
  let pointer = M;
  while (1) {
    if (weights.slice(1).some((v) => v > weights[0])) {
      weights.push(weights.shift());
    } else {
      weights.shift();
      count++;
      if (pointer === 0) {
        console.log(count);
        break;
      }
    }

    if (pointer === 0) pointer = weights.length - 1;
    else pointer--;
  }
}
