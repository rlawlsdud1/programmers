function solution(n, left, right) {
  // 2차원 풀이
  // const squareMatrix = Array.from({ length: n }, () =>
  //   Array.from({ length: n }).fill(0)
  // );
  // for (let i = 0; i < n; i++) {
  //   let count = i + 1;
  //   for (let j = 0; j < n; j++) {
  //     if (i >= j) squareMatrix[i][j] = count;
  //     else squareMatrix[i][j] = ++count;
  //   }
  // }
  // let answer = [];
  // if (Math.floor(left / n) === Math.floor(right / n)) {
  //   answer = squareMatrix[Math.floor(left / n)].slice(
  //     left % n,
  //     (right % n) + 1
  //   );
  // } else {
  //   answer = squareMatrix[Math.floor(left / n)].slice(left % n, n);
  //   for (let i = Math.floor(left / n) + 1; i < Math.floor(right / n); i++) {
  //     answer = [...answer, ...squareMatrix[i]];
  //   }
  //   answer = answer.concat(
  //     squareMatrix[Math.floor(right / n)].slice(0, (right % n) + 1)
  //   );
  // }
  // return answer;

  const answer = [];
  for (let i = left; i <= right; i++) {
    answer.push(Math.max(Math.floor(i / n), i % n) + 1);
  }

  return answer;
}