function solution(n) {
  return fib(n) % 1234567n;
}

function fib(n) {
  const fibValue = [0n, 1n];
  for (let i = 2; i <= n; i++) {
    fibValue[i] = fibValue[i - 1] + fibValue[i - 2];
  }
  return fibValue[n];
}