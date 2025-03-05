const fs = require("fs");
// 제출할때는 '/dev/stdin' 로 바꾸기
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

input = input.map((v) => v.trim()).map((e) => e.split(" ").map(Number));
const [N, K] = input[0];
const info = input.slice(1);

// dp[i][w] 는 i번째 물건에서 w 이하의 무게들을 담을 때의 최댓값
// 이를 점화식으로 나타내면
// dp[i][w] = Math.max( dp[i-1][w], dp[i-1][w-w[i]] + v[i] )
// 이를 해석해보면 i번째를 안담았을 때, i번째를 담았을 때 중 큰 값을 선택
// 근데 i번째를 담는다면 w-w[i] 는 0 이상이어야 한다.

const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: K + 1 }).fill(0)
);

for (let i = 1; i <= N; i++) {
  const thing = info[i - 1];
  for (let w = 1; w <= K; w++) {
    if (w - thing[0] >= 0) {
      dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - thing[0]] + thing[1]);
    } else {
      dp[i][w] = dp[i - 1][w];
    }
  }
}

console.log(Math.max(...dp[N]));
