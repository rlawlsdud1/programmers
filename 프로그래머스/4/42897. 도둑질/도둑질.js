function solution(money) {
  // 집들이 원형으로 위치하기에 처음과 끝이 연결되어 있다.
  // 따라서 첫번째 집을 터는 경우의 dp1, 안 터는 경우의 dp2 를 만들고
  // 마지막 원소가 더 큰 것을 return 한다.
  // dp[i] 가 의미하는 것은 i번째 집까지 왔을 때의 최댓값을 뜻한다.
  const n = money.length;
  const dp1 = Array.from({ length: n }).fill(0);
  const dp2 = Array.from({ length: n }).fill(0);

  // 첫번째 집을 터는 경우의 초기값 세팅
  dp1[0] = money[0];
  dp1[1] = Math.max(money[0], money[1]);

  // 첫번째 집을 안터는 경우의 초기값 세팅
  dp2[0] = 0;
  dp2[1] = money[1];

  // 첫번째 집을 턴다면 마지막 집은 못턴다다
  for (let i = 2; i < n - 1; i++) {
    dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + money[i]);
  }

  for (let i = 2; i < n; i++) {
    dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + money[i]);
  }

  return Math.max(dp1[n - 2], dp2[n - 1]);
}