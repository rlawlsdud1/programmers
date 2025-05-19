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

const [n, m] = input[0].split(" ").map(Number);
const info = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
const parent = Array.from({ length: n }).map((_, i) => i);

function find(x) {
  if (parent[x] !== x) {
    parent[x] = find(parent[x]);
  }
  return parent[x];
}

function union(x, y) {
  const rootX = find(x);
  const rootY = find(y);

  if (rootX === rootY) return true;
  parent[rootY] = rootX;
  return false;
}

let answer = 0;
for (let i = 0; i < m; i++) {
  const [x, y] = info[i];
  if (union(x, y)) {
    answer = i + 1;
    break;
  }
}

console.log(answer);
