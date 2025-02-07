function solution(brown, yellow) {
  const candidate = [];
  const product = brown + yellow;
  for (let i = 3; i <= Math.sqrt(product); i++) {
    if (product % i === 0) {
      if (product / i >= 3) {
        candidate.push([i, product / i]);
      }
    }
  }

  for (let i = 0; i < candidate.length; i++) {
    const [a, b] = candidate[i];
    if (brown === 2 * (a + b) - 4 && yellow === (a - 2) * (b - 2)) {
      return [b, a];
    }
  }
}