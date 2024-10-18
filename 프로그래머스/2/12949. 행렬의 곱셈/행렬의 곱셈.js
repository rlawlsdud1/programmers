function solution(arr1, arr2) {
  const n = arr1.length;
  const m = arr2[0].length;
  const l = arr1[0].length;
  // 모든 원소가 0인 n x m matrix
  let productedMatrix = new Array(n).fill(0).map(() => new Array(m).fill(0));

  // outer loop x inner loop => n x m 번 반복
  // 가장 안쪽 loop 에서는 곱셈 실행
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      for (let k = 0; k < l; k++) {
        productedMatrix[i][j] += arr1[i][k] * arr2[k][j];
      }
    }
  }
  return productedMatrix;
}