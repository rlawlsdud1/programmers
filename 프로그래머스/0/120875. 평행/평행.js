function solution(dots) {
  let answer = 0;
  if (
    (dots[0][1] - dots[1][1]) / (dots[0][0] - dots[1][0]) ===
    (dots[2][1] - dots[3][1]) / (dots[2][0] - dots[3][0])
  ) {
    answer++;
  }
  if (
    (dots[0][1] - dots[2][1]) / (dots[0][0] - dots[2][0]) ===
    (dots[1][1] - dots[3][1]) / (dots[1][0] - dots[3][0])
  ) {
    answer++;
  }
  if (
    (dots[0][1] - dots[3][1]) / (dots[0][0] - dots[3][0]) ===
    (dots[1][1] - dots[2][1]) / (dots[1][0] - dots[2][0])
  ) {
    answer++;
  }

  if (answer >= 1) {
    return 1;
  }
  return 0;
}