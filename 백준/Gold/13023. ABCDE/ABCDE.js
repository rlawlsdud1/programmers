const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, _] = input[0].split(" ").map(Number);
const info = input.slice(1).map((v) => v.split(" ").map(Number));

const adjacantList = Array.from({ length: N }, () => []);
info.forEach((v) => {
  const [a, b] = v;
  adjacantList[a].push(b);
  adjacantList[b].push(a);
});

// 시작 노드에서 출발해서 겹침없이 5개 노드 방문 가능하면 될거 같은데
const visited = Array.from({ length: N }).fill(false);
let answer = 0;
function DFS(node, count) {
  if (count === 5) {
    answer = 1;
    return;
  }

  for (let i = 0; i < adjacantList[node].length; i++) {
    const adjacantNode = adjacantList[node][i];
    if (!visited[adjacantNode]) {
      visited[adjacantNode] = true;
      DFS(adjacantNode, count + 1);
      if (answer) break;
      visited[adjacantNode] = false;
    }
  }
}

for (let i = 0; i < N; i++) {
  visited[i] = true;
  DFS(i, 1);
  visited[i] = false;
  if (answer) break;
}

console.log(answer);
