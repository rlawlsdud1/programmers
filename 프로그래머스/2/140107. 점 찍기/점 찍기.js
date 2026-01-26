function solution(k, d) {
  let answer = 0;

  for (let x = 0; x <= d; x += k) {
    const y = Math.sqrt(d ** 2 - x ** 2);

    answer += Math.floor(y / k) + 1;
  }

  return answer;
}
