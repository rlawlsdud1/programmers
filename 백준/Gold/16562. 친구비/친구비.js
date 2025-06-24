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

const graph = Array.from({ length: N + 1 }, () => []);

relations.forEach((v) => {
  const [a, b] = v;
  graph[a].push(b);
  graph[b].push(a);
});

const visited = Array.from({ length: N + 1 }).fill(false);
visited[0] = true; // zero index는 사용 안하므로 전처리

function DFS(node) {
  for (const adjacantNode of graph[node]) {
    if (!visited[adjacantNode]) {
      visited[adjacantNode] = true;
      minValue = Math.min(minValue, info[adjacantNode]);
      DFS(adjacantNode);
    }
  }
}

let answer = 0;
let minValue = Infinity;
for (let i = 1; i <= N; i++) {
  if (!visited[i]) {
    visited[i] = true;
    minValue = info[i];
    DFS(i);
    answer += minValue;
  }

  minValue = Infinity;
}

if (!visited.some((v) => v === false) && k >= answer) {
  console.log(answer);
} else {
  console.log("Oh no");
}
