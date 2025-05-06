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
  const color = Array.from({ length: n }).fill(-1); // 처음엔 전부 색칠 X

  // 연결 그래프가 아닐 수도 있기에 for문 돌린다.
  for (let start = 1; start <= n; start++) {
    // 색칠 안된 상태라면,
    if (color[start] === -1) {
      const queue = [start];
      color[start] = 0; // 색 하나 임의로 칠하기

      while (queue.length) {
        const node = queue.shift();

        for (const adjacantNode of graph[node]) {
          if (color[adjacantNode] === -1) {
            color[adjacantNode] = 1 - color[node]; // queue에서 꺼낸 node랑 반대 색 칠하기
            queue.push(adjacantNode);
          } else if (color[adjacantNode] === color[node]) {
            return false;
          }
        }
      }
    }
  }

  return true;
}
