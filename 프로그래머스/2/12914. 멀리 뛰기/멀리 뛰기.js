function solution(n) {
  // 피보나치(느낌의) 수열이었다
  // n은 하나 밀린다

  function fib(n) {
    const fibValues = [BigInt(1), BigInt(2)];

    for (let i = 2; i <= n; i++) {
      fibValues[i] = BigInt(fibValues[i - 1]) + BigInt(fibValues[i - 2]);
    }

    return fibValues[n - 1];
  }

  return fib(n) % BigInt(1234567);
}
