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
const m = Number(input[1]);
const info = input.slice(2, 2 + m).map((v) => v.split(" ").map(Number));

const graph = {};
for (let i = 1; i <= n; i++) {
  graph[i] = Array.from({ length: n }).fill(Infinity);
}

const dp = Array.from({ length: n }, () =>
  Array.from({ length: n }).fill(Infinity)
);
info.forEach((v) => {
  const [a, b, c] = v;
  graph[a][b - 1] = Math.min(graph[a][b - 1], c);
});

// 초깃값 세팅
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (i !== j) {
      dp[i][j] = graph[i + 1][j];
    }
  }
}

for (let i = 0; i < n; i++) dp[i][i] = 0;

for (let k = 1; k <= n; k++) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      dp[i][j] = Math.min(dp[i][j], dp[i][k - 1] + dp[k - 1][j]);
    }
  }
}

dp.forEach((v) => {
  v = v.map((e) => {
    if (e === Infinity) {
      return 0;
    } else return e;
  });

  console.log(v.join(" "));
});
