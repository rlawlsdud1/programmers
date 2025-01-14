function solution(n, works) {
  if (works.reduce((acc, cur) => acc + cur, 0) < n) {
    return 0;
  }

  works = works.sort((a, b) => b - a);

  let remain = n;
  let max;

  while (remain > 0) {
    max = works[0];
    const count = works.filter((v) => v === max).length;

    for (let i = 0; i < Math.min(count, remain); i++) {
      works[i] -= 1;
    }

    remain -= Math.min(count, remain);
  }

  return works.reduce((acc, cur) => acc + cur ** 2, 0);
}