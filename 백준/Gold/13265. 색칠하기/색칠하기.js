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

const T = Number(input[0]);
const info = input.slice(1).map((v) => v.split(" ").map(Number));
let idx = 0;

for (let i = 0; i < T; i++) {
  const [n, m] = info[idx++];
  const relations = info.slice(idx, idx + m);

  const adjacantList = Array.from({ length: n + 1 }, () => []);

  relations.forEach((v) => {
    const [a, b] = v;
    adjacantList[a].push(b);
    adjacantList[b].push(a);
  });

  const visited = Array.from({ length: n + 1 }).fill(false);
  const colors = Array.from({ length: n + 1 }).fill(false);

  if (isBipartite(adjacantList, visited, colors)) console.log("possible");
  else console.log("impossible");

  idx += m;
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
            // queue에서 꺼낸 node랑 반대 색 칠하기
            color[adjacantNode] = 1 - color[node];
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
