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

const K = Number(input[0]);
const info = input.slice(1).map((v) => v.split(" ").map(Number));
let idx = 0;

for (let i = 0; i < K; i++) {
  const [V, E] = info[idx++];
  const graph = Array.from({ length: V + 1 }, () => []);

  for (let j = 0; j < E; j++) {
    const [u, v] = info[idx++];
    graph[u].push(v);
    graph[v].push(u);
  }

  let answer = isBipartite(graph);
  console.log(answer ? "YES" : "NO");
}

function isBipartite(graph) {
  const n = graph.length;
  const color = new Array(n).fill(-1);

  for (let start = 1; start <= n; start++) {
    if (color[start] === -1) {
      const queue = [start];
      color[start] = 0;

      while (queue.length > 0) {
        const node = queue.shift();
        for (const neighbor of graph[node]) {
          if (color[neighbor] === -1) {
            color[neighbor] = 1 - color[node];
            queue.push(neighbor);
          } else if (color[neighbor] === color[node]) {
            return false;
          }
        }
      }
    }
  }

  return true;
}
