const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

const N = Number(input[0]);

const answer = [];
function DFS(path) {
  answer.push(Number(path.join("")));

  const pathLength = path.length;
  for (let i = 9; i >= 0; i--) {
    if (pathLength === 0 || path[pathLength - 1] > i) {
      path.push(i);
      DFS(path);
      path.pop();
    }
  }
}

DFS([]);

answer.sort((a, b) => a - b);

if (answer.slice(1)[N] !== undefined) {
  console.log(answer.slice(1)[N]);
} else {
  console.log(-1);
}
