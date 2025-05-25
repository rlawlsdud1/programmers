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
  const [N, K] = info[idx++];
  const prices = info[idx++];
  const relations = info.slice(idx, idx + K);
  idx += K;
  const target = info[idx++];

  const adjacantList = Array.from({ length: N + 1 }, () => []);
  const reverseAdjacantList = Array.from({ length: N + 1 }, () => []);
  const inDegree = Array.from({ length: N + 1 }).fill(0);

  relations.forEach((v) => {
    const [a, b] = v;
    adjacantList[a].push(b);
    reverseAdjacantList[b].push(a);
    inDegree[b] += 1;
  });

  const queue = [];
  const dp = Array.from({ length: N + 1 }).fill(0);

  for (let j = 1; j <= N; j++) {
    if (inDegree[j] === 0) {
      queue.push(j);
      dp[j] = prices[j - 1];
    }
  }

  while (queue.length) {
    const node = queue.shift();

    for (const adjacantNode of adjacantList[node]) {
      inDegree[adjacantNode] -= 1;

      if (inDegree[adjacantNode] === 0) {
        queue.push(adjacantNode);
        dp[adjacantNode] =
          getPrice(adjacantNode, reverseAdjacantList, dp) +
          prices[adjacantNode - 1];
      }
    }
  }
  console.log(dp[target]);
}

function getPrice(node, adjacantList, dp) {
  let time = 0;
  for (const adjacantNode of adjacantList[node]) {
    time = Math.max(time, dp[adjacantNode]);
  }

  return time;
}
