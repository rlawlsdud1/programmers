function solution(triangle) {
  triangle = triangle.reverse();

  for (let i = 1; i < triangle.length; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      triangle[i][j] += Math.max(triangle[i - 1][j], triangle[i - 1][j + 1]);
    }
  }

  return triangle.at(-1)[0];
}