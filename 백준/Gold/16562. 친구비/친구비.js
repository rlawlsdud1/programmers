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

const [N, M, k] = input[0].split(" ").map(Number);
const info = input[1].split(" ").map(Number);
info.unshift(0);
const relations = input.slice(2, 2 + M).map((v) => v.split(" ").map(Number));

const parent = Array.from({ length: N + 1 }, (_, i) => i);

function find(x) {
  if (parent[x] !== x) {
    parent[x] = find(parent[x]);
  }
  return parent[x];
}

function union(x, y) {
  const rootX = find(x);
  const rootY = find(y);
  if (rootX === rootY) return;

  if (info[rootX] < info[rootY]) parent[rootY] = rootX;
  else parent[rootX] = rootY;
}

relations.forEach(([a, b]) => {
  union(a, b);
});

const visited = new Set();
let answer = 0;
for (let i = 1; i <= N; i++) {
  const root = find(i);
  if (!visited.has(root)) {
    visited.add(root);
    answer += info[root];
  }
}

console.log(k >= answer ? answer : "Oh no");
