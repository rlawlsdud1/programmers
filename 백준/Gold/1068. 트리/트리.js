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

const N = Number(input[0]);
const info = input[1].split(" ").map(Number);
const target = Number(input[2]);
let rootNode;

const adjacantList = Array.from({ length: N }, () => []);

for (let i = 0; i < N; i++) {
  // i, info[i] 연결 설정
  if (info[i] === -1) {
    rootNode = i;
    continue;
  }
  adjacantList[info[i]].push(i);
}

const visited = Array.from({ length: N }).fill(false);

function DFSForDelete(node) {
  visited[node] = true;

  for (const adjacantNode of adjacantList[node]) {
    if (!visited[adjacantNode]) {
      DFSForDelete(adjacantNode);
    }
  }
}

// 타겟 노드와 그 자손 제거하고 시작
DFSForDelete(target);

let count = 0;

function DFS(node) {
  visited[node] = true;

  // 더 이상 갈 수 있는 곳이 없다면 cnt++
  if (adjacantList[node].length === 0) {
    count++;
  } else {
    let isPossible = true;
    for (const adjacantNode of adjacantList[node]) {
      if (!visited[adjacantNode]) {
        isPossible = false;
        break;
      }
    }

    if (isPossible) count++;
  }

  for (const adjacantNode of adjacantList[node]) {
    if (!visited[adjacantNode]) {
      DFS(adjacantNode);
    }
  }
}
if (!visited[rootNode]) DFS(rootNode);

console.log(count);
