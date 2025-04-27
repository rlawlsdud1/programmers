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

const V = Number(input[0]);
const info = input.slice(1, 1 + V).map((v) => v.split(" ").map(Number));

const adjacantList = Array.from({ length: V + 1 }, () => []);
info.forEach((v) => {
  let idx = 0;
  const start = v[idx++];

  while (v[idx] !== -1) {
    const end = v[idx++];
    const distance = v[idx++];

    adjacantList[start].push([end, distance]);
  }
});

let answer = 0;
let v;

function DFS(node, visited, sum) {
  if (answer < sum) {
    answer = sum;
    v = node;
  }
  answer = Math.max(answer, sum);

  for (const adjacantNodeInfo of adjacantList[node]) {
    const [adjacantNode, distance] = adjacantNodeInfo;

    if (!visited[adjacantNode]) {
      visited[adjacantNode] = true;
      DFS(adjacantNode, visited, sum + distance);
      visited[adjacantNode] = false;
    }
  }
}

const visited = Array.from({ length: V + 1 }).fill(false);
visited[1] = true;
DFS(1, visited, 0);
visited[1] = false;

visited[v] = true;
DFS(v, visited, 0);
console.log(answer);
