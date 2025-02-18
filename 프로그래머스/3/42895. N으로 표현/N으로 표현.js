function solution(N, number) {
  // index 맞추기 위해 length 9로 설정
  const dp = Array.from({ length: 9 }, () => new Set());

  // N을 1 ~ 9개 사용하여 만들 수 있는 수들을 만들 것이다
  for (let i = 1; i < 9; i++) {
    dp[i].add(Number(String(N).repeat(i)));

    for (let j = 1; j < i; j++) {
      for (let a of dp[j]) {
        for (let b of dp[i - j]) {
          dp[i].add(a * b);
          dp[i].add(a + b);
          dp[i].add(a - b);
          dp[i].add(Math.floor(a / b));
        }
      }
    }

    if (dp[i].has(number)) {
      return i;
    }
  }

  return -1;
}