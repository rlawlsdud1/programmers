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
const info = input.slice(1, 1 + N).map(Number);

// N은 홀수
info.sort((a, b) => a - b);
const sum = info.reduce((acc, cur) => acc + cur, 0);
const a = Math.round(sum / N);
const b = info[Math.floor(N / 2)];
let c;
const d = info[N - 1] - info[0];

const objToFindC = {};
info.forEach((v) => {
  objToFindC[v] ? (objToFindC[v] += 1) : (objToFindC[v] = 1);
});

const sortedObjToFindC = Object.entries(objToFindC).sort((a, b) => {
  if (b[1] === a[1]) {
    return a[0] - b[0];
  }
  return b[1] - a[1];
});
if (sortedObjToFindC[1] && sortedObjToFindC[0][1] === sortedObjToFindC[1][1]) {
  c = Number(sortedObjToFindC[1][0]);
} else {
  c = Number(sortedObjToFindC[0][0]);
}

console.log(a === -0 ? 0 : a);
console.log(b);
console.log(c);
console.log(d);
