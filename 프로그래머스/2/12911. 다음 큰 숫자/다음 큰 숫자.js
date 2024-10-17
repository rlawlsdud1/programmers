function solution(n) {
  const countOfOne = n
    .toString(2)
    .split("")
    .filter((e) => e === "1").length;
  let nextBigNum = n + 1;

  while (
    nextBigNum
      .toString(2)
      .split("")
      .filter((e) => e === "1").length !== countOfOne
  ) {
    nextBigNum++;
  }
  return nextBigNum;
}