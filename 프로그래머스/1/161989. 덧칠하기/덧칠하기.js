function solution(n, m, section) {
  let answer = 0;
  while (true) {
    const idx = section.findIndex((v) => v > section[0] + m - 1);
    answer++;
    if (idx === -1) {
      return answer;
    }
    section = section.slice(idx);
  }
}