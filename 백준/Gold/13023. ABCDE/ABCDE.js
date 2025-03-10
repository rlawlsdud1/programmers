const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const info = input.slice(1, M + 1).map((v) => v.split(" ").map(Number));

const adjacantList = Array.from({ length: N }, () => []);
info.forEach((v) => {
  const [a, b] = v;
  adjacantList[a].push(b);
  adjacantList[b].push(a);
});

let answer = 0;

function DFS(node, count, visited) {
  if (count === 5) {
    answer = 1;
    return true;
  }

  visited[node] = true;

  for (let i = 0; i < adjacantList[node].length; i++) {
    const adjacantNode = adjacantList[node][i];
    if (!visited[adjacantNode]) {
      if (DFS(adjacantNode, count + 1, visited)) {
        return true;
      }
    }
  }

  visited[node] = false;
  return false;
}

for (let i = 0; i < N; i++) {
  const visited = Array.from({ length: N }).fill(false);
  if (DFS(i, 1, visited)) {
    break;
  }
}

console.log(answer);