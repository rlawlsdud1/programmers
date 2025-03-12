const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((v) => v.trim());

const [N, M] = input[0].split(" ").map(Number);
const info = input.slice(1, 1 + M).map((v) => v.split(" ").map(Number));
const S = Number(input[1 + M]);
const fans = input[2 + M].split(" ").map(Number);
const setOfFans = new Set();
fans.forEach((v) => {
  setOfFans.add(v);
});

const adjacantList = Array.from({ length: N + 1 }, () => []);
info.forEach((v) => {
  const [a, b] = v;
  adjacantList[a].push(b);
});

function DFS(node, visited) {
  if (setOfFans.has(node)) return;

  // 더이상 도달할 수 없는 곳 까지 온다면, 가능한 경우가 있다는 것
  if (adjacantList[node].length === 0) isPossible = true;

  for (const adjacantNode of adjacantList[node]) {
    if (!visited[adjacantNode]) {
      visited[adjacantNode] = true;
      DFS(adjacantNode, visited);
    }
  }
}
let isPossible = false;

if (setOfFans.has(1)) {
  console.log("Yes");
} else {
  const visited = Array.from({ length: N + 1 }).fill(false);
  visited[1] = true;
  DFS(1, visited);
  if (isPossible) console.log("yes");
  else console.log("Yes");
}
