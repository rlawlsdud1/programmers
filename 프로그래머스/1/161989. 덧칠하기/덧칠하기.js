function solution(n, m, section) {
  let answer = 1;
  let idx = 0;
  while (section.length) {
    idx = section.findIndex((v) => v >= section[idx] + m);
    if (idx === -1) {
      break;
    }
    answer++;
  }
  return answer;
}
