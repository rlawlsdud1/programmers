// N 사용 횟수
//      1        N
//      2        NN, N 과 N의 사칙연산
//      3        NNN, N 과 NN의 사칙연산, NN과 N의 사칙연산
//      4        NNNN, N과 NNN, NN과 NN, NNN과, N
//      5        NNNNN, ...
//      6        NNNNNM, ...
//      7        NNNNNMN, ...
//      8        NNNNNMNM, ...

function solution(N, number) {
  // dp[i] 는 N을 i번 사용했을 때의 값을 저장한 set
  // Set의 요소를 삽입 순서대로 순회할 수 있다
  const dp = Array.from({ length: 9 }, () => new Set());

  for (let i = 1; i <= 8; i++) {
    dp[i].add(Number(String(N).repeat(i)));

    for (let j = 1; j < i; j++) {
      for (const a of dp[i - j]) {
        for (const b of dp[j]) {
          dp[i].add(a * b);
          dp[i].add(a + b);
          dp[i].add(a - b);
          dp[i].add(Math.floor(a / b));
        }
      }
    }

    if (dp[i].has(number)) return i;
  }

  return -1;
}