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

const n = Number(input[0]);
const info = input.slice(1, n).map((v) => v.split(" ").map(Number));
const adjacantList = Array.from({ length: n + 1 }, () => []);

if (n === 1) {
  console.log(0);
  process.exit(0);
}

info.forEach((v) => {
  const [a, b, length] = v;
  adjacantList[a].push([b, length]);
  adjacantList[b].push([a, length]);
});

let tempLength = 0;
let mostFarNodeFromRoot;
let visited = new Set();

function getMaxLength(node, sumOfLength) {
  if (tempLength < sumOfLength) {
    tempLength = sumOfLength;
    mostFarNodeFromRoot = node;
  }

  for (const [adjacantNode, length] of adjacantList[node]) {
    if (!visited.has(adjacantNode)) {
      visited.add(adjacantNode);
      getMaxLength(adjacantNode, sumOfLength + length);
    }
  }
}

visited.add(1);
getMaxLength(1, 0);

tempLength = 0;
visited = new Set();
visited.add(mostFarNodeFromRoot);
getMaxLength(mostFarNodeFromRoot, 0);

console.log(tempLength);
