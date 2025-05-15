const fs = require("fs");
const Path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : Path.join(__dirname, "../input.txt");
const input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((v) => v.trim());

const N = Number(input[0]);
const info = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
info.forEach((v) => {
  const [a, b] = v;
  graph[a].push(b);
  graph[b].push(a);
});

const visited = new Set();
const path = [];
let cycle = [];

function DFS(node, prev) {
  path.push(node);
  visited.add(node);

  for (const adjacantNode of graph[node]) {
    // 이전에 온 곳이면 pass
    if (adjacantNode === prev) continue;

    // 방문한 적 없을 때
    if (!visited.has(adjacantNode)) {
      // cycle이 형성되면 true 반환
      if (DFS(adjacantNode, node)) return true;
    } else {
      // 여기 걸리면 cycle 형성된 것임
      const idx = path.indexOf(adjacantNode);
      cycle = path.slice(idx);

      // cycle이 형성되면 true 반환
      return true;
    }
  }

  path.pop();
  return false;
}

DFS(1, -1);

const visitedForVisited = new Set();
const queue = [];
cycle.forEach((v) => {
  visitedForVisited.add(v);
  queue.push([v, 0]);
});

const distances = Array.from({ length: N }).fill(0);

while (queue.length) {
  const [node, distance] = queue.shift();

  for (const adjacantNode of graph[node]) {
    if (!visitedForVisited.has(adjacantNode)) {
      visitedForVisited.add(adjacantNode);
      distances[adjacantNode - 1] = distance + 1;
      queue.push([adjacantNode, distance + 1]);
    }
  }
}
console.log(distances.join(" "));
