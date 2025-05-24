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

// 모든 건물을 짓는 것이 가능한 입력만 주어진다
// -> 방향 비순환 그래프, topological sort problem

const N = Number(input[0]);
const info = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
const timeForBuild = Array.from({ length: N + 1 }).fill(0);
const adjacantList = Array.from({ length: N + 1 }, () => []);
const reverseAdjacantList = Array.from({ length: N + 1 }, () => []);
const inDegree = Array.from({ length: N + 1 }).fill(0);

info.forEach((v, i) => {
  const [time, ...buildingNums] = v;
  timeForBuild[i + 1] = time;
  inDegree[i + 1] += buildingNums.length - 1;

  for (let j = 0; j < buildingNums.length - 1; j++) {
    const buildingNum = buildingNums[j];
    adjacantList[buildingNum].push(i + 1);
    reverseAdjacantList[i + 1].push(buildingNum);
  }
});

const queue = [];

const dp = Array.from({ length: N + 1 }).fill(Infinity);

for (let i = 1; i <= N; i++) {
  if (inDegree[i] === 0) {
    queue.push(i);
    dp[i] = timeForBuild[i];
  }
}

while (queue.length) {
  const node = queue.shift();

  for (const adjacantNode of adjacantList[node]) {
    inDegree[adjacantNode] -= 1;

    if (inDegree[adjacantNode] === 0) {
      dp[adjacantNode] = timeForBuild[adjacantNode] + getTime(adjacantNode);

      queue.push(adjacantNode);
    }
  }
}

console.log(dp.slice(1).join("\n"));

function getTime(node) {
  let time = 0;
  for (const adjacantNode of reverseAdjacantList[node]) {
    time = Math.max(time, dp[adjacantNode]);
  }

  return time;
}
