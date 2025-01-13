function solution(k, tangerine) {
  const obj = {};
  tangerine.forEach((v) => {
    obj[v] ? (obj[v] += 1) : (obj[v] = 1);
  });

  const sortedTangerine = Object.entries(obj).sort((a, b) => a[1] - b[1]);
  const throwAwayCnt = tangerine.length - k;

  let count = 0;
  let idx = 0;
  while (1) {
    count += sortedTangerine[idx][1];
    if (count === throwAwayCnt) {
      idx++;
      return sortedTangerine.slice(idx).length;
    } else if (count > throwAwayCnt) {
      return sortedTangerine.slice(idx).length;
    }

    idx++;
  }
}