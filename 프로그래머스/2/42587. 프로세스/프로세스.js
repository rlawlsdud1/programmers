function solution(priorities, location) {
  // 중요도가 높을수록 먼저 실행된다
  const locAndPrior = priorities.map((v, i) => [v, i]);
  const complete = [];
  while (locAndPrior.length) {
    if (locAndPrior.slice(1).find((v) => v[0] > locAndPrior[0][0])) {
      locAndPrior.push(locAndPrior.shift());
    } else {
      complete.push(locAndPrior.shift());
    }
  }
  return complete.findIndex((v) => v[1] === location) + 1;
}