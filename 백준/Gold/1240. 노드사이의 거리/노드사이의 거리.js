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
const info = input.slice(1, N).map((v) => v.split(" ").map(Number));
const targetNodes = input.slice(N).map((v) => v.split(" ").map(Number));
const adjacantList = Array.from({ length: N + 1 }, () => []);
info.forEach((v) => {
  const [a, b, d] = v;
  adjacantList[a].push([b, d]);
  adjacantList[b].push([a, d]);
});

targetNodes.forEach((v) => {
  const visited = Array.from({ length: N + 1 }).fill(false);
  const [a, b] = v;
  visited[a] = true;

  findDistance(a, b, 0, visited);
});

function findDistance(a, b, dist, visited) {
  if (a === b) {
    console.log(dist);
    return;
  }
  for (let i = 0; i < adjacantList[a].length; i++) {
    const [adjacantNode, distance] = adjacantList[a][i];

    if (!visited[adjacantNode]) {
      visited[adjacantNode] = true;
      findDistance(adjacantNode, b, dist + distance, visited);
    }
  }
}
