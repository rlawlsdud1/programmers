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

const [N, R, Q] = input[0].split(" ").map(Number);
const info = input.slice(1, N).map((v) => v.split(" ").map(Number));
const queries = input.slice(N, N + Q).map(Number);

const tree = Array.from({ length: N + 1 }, () => []);
info.forEach((v) => {
  const [U, V] = v;
  tree[U].push(V);
  tree[V].push(U);
});

// 정점 U를 루트로 하는 서브트리에 속한 정점의 수를 출력한다.
// 쿼리의 개수가 10^5 개 이하이므로 각 쿼리마다 새롭게 탐색을 도는건 불필요해보인다.
// 루트에서 시작해서 return 값으로 메모이제이션하는게 좋을 듯 하다
const dp = Array.from({ length: N + 1 }).fill(0);
const visited = Array.from({ length: N + 1 }).fill(false);

function DFSForCnt(vertex) {
  let count = 1; // 자기 자신 포함하므로 1에서 시작

  for (const adjacantVertex of tree[vertex]) {
    if (!visited[adjacantVertex]) {
      visited[adjacantVertex] = true;
      count += DFSForCnt(adjacantVertex);
    }
  }

  dp[vertex] = count;

  return count;
}

visited[R] = true;
DFSForCnt(R);

queries.forEach((q) => {
  console.log(dp[q]);
});
