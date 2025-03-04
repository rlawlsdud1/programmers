function solution(money) {
  // 집들이 원형으로 배치되어 있기 때문에,
  // 첫 번째 집과 마지막 집도 서로 인접한 것으로 간주

  // dp1 은 첫번째 집을 털었을 때의 dp table
  //  -> 첫번째 집을 턴다면, 마지막 집을 털 수 없음

  // dp2 는 첫번째 집을 안 털었을 때의 dp table
  //  -> 첫번째 집을 안 턴다면, 마지막 집을 털 수 있음

  // 위 사항을 고려하여 loop range setting

  // dp[i] 는 i번째집까지 왔을 때의 최댓값

  const dp1 = Array.from({ length: money.length });
  dp1[0] = money[0];
  dp1[1] = Math.max(money[0], money[1]);

  const dp2 = Array.from({ length: money.length });
  dp2[0] = 0;
  dp2[1] = money[1];

  for (let i = 2; i < money.length - 1; i++) {
    dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + money[i]);
  }

  for (let i = 2; i < money.length; i++) {
    dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + money[i]);
  }

  // 여기서도 index 조심.
  return Math.max(dp1.at(-2), dp2.at(-1));
}