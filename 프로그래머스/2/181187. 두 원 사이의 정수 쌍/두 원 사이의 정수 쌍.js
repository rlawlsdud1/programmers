function solution(r1, r2) {
  let answer = 0;

  for (let x = 0; x < r2; x++) {
    if (x < r1) {
      const count =
        Math.floor(Math.sqrt(r2 ** 2 - x ** 2)) -
        Math.ceil(Math.sqrt(r1 ** 2 - x ** 2)) +
        1;
      answer += count;
    } else {
      answer += Math.floor(Math.sqrt(r2 ** 2 - x ** 2));
    }
  }

  return answer * 4;
}