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
const M = Number(input[1]);
const info = input.slice(2, 2 + N).map((v) => v.split(" ").map(Number));
const plan = input[2 + N].split(" ").map(Number);

const graph = Array.from({ length: N }, () => []);

for (let i = 0; i < N; i++) {
  graph[i].push(i);
  for (let j = i + 1; j < N; j++) {
    if (info[i][j] === 1) {
      graph[i].push(j);
      graph[j].push(i);
    }
  }
}
const start = plan[0];
const visited = new Set();

function DFS(node) {
  for (const adjacantNode of graph[node]) {
    if (!visited.has(adjacantNode)) {
      visited.add(adjacantNode);
      DFS(adjacantNode);
    }
  }
}

DFS(start - 1);

for (let i = 0; i < M; i++) {
  if (!visited.has(plan[i] - 1)) {
    console.log("NO");
    process.exit(0);
  }
}

console.log("YES");
