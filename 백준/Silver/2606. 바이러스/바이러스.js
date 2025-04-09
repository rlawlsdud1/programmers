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
const info = input.slice(2, 2 + M).map((v) => v.split(" ").map(Number));
const adjacantList = Array.from({ length: N + 1 }, () => []);
const visited = Array.from({ length: N + 1 }).fill(false);

info.forEach((v) => {
  const [a, b] = v;
  adjacantList[a].push(b);
  adjacantList[b].push(a);
});

function DFS(node) {
  let count = 1;

  for (const adjacantNode of adjacantList[node]) {
    if (!visited[adjacantNode]) {
      visited[adjacantNode] = true;
      count += DFS(adjacantNode);
    }
  }

  return count;
}

visited[1] = true;

console.log(DFS(1) - 1);
