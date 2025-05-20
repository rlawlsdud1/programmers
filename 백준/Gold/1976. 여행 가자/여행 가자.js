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
const M = Number(input[1]);
const info = input.slice(2, 2 + N).map((v) => v.split(" ").map(Number));
const plan = input[2 + N].split(" ").map(Number);

// 연결 상태 정리하고, plan에 있는 노드들이 같은 루트 노드를 가리킨다면
// 가능한 경우인 것이다

const parent = Array.from({ length: N }).map((_, i) => i);

// 대칭 이루니까 loop는 다음과 같이 설정
for (let i = 1; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (info[i][j] === 1) {
      union(i, j);
    }
  }
}

function find(x) {
  if (parent[x] !== x) {
    parent[x] = find(parent[x]);
  }
  return parent[x];
}

function union(x, y) {
  const rootX = find(x);
  const rootY = find(y);

  parent[rootY] = rootX;
}

const answerSet = new Set();
plan.forEach((v) => {
  answerSet.add(find(v - 1));
});

if (answerSet.size === 1) console.log("YES");
else console.log("NO");
