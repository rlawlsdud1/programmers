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

const [N, W] = input[0].split(" ").map(Number);
const info = input.slice(1, N).map((v) => v.split(" ").map(Number));

const adjacantList = Array.from({ length: N + 1 }, () => []);
info.forEach((v) => {
  const [a, b] = v;
  adjacantList[a].push(b);
  adjacantList[b].push(a);
});
let count = 0;

for (let i = 2; i <= N; i++) {
  if (adjacantList[i].length === 1) count++;
}

console.log(W / count);
