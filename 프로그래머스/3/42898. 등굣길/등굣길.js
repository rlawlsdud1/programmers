function solution(m, n, puddles) {
  const dp = Array.from({ length: n }, () => Array.from({ length: m }).fill(0));
  const puddlesSet = new Set();
  puddles.forEach(([a, b]) => {
    puddlesSet.add(`${b - 1},${a - 1}`);
  });

  for (let j = 0; j < m; j++) {
    if (puddlesSet.has(`${0},${j}`)) break;
    dp[0][j] = 1;
  }

  for (let i = 0; i < n; i++) {
    if (puddlesSet.has(`${i},${0}`)) break;
    dp[i][0] = 1;
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (puddlesSet.has(`${i},${j}`)) continue;
      dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 1_000_000_007;
    }
  }

  return dp[n - 1][m - 1];
}