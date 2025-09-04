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
const entrance = input.slice(1, 1 + N);
const exit = input.slice(1 + N, 2 * N + 1);

const entranceObj = {};
const exitOrder = [];

entrance.forEach((v, i) => {
  entranceObj[v] = i + 1;
});

exit.forEach((v) => {
  exitOrder.push(entranceObj[v]);
});

let count = 0;

for (let i = 0; i < N; i++) {
  const cur = exitOrder[i];

  let rightOrder = true;
  for (let j = i + 1; j < N; j++) {
    if (exitOrder[j] < cur) {
      rightOrder = false;
      break;
    }
  }

  if (!rightOrder) count++;
}

console.log(count);
