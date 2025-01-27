function solution(n) {
  const fibValues = [1n, 2n];

  for (let i = 3; i <= n; i++) {
    fibValues[i - 1] = fibValues[i - 2] + fibValues[i - 3];
  }

  return Number(fibValues[n - 1] % 1234567n);
}