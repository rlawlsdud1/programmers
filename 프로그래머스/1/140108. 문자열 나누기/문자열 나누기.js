function solution(s) {
  var answer = 0;
  while (s.length) {
    let xCount = 1;
    let notXCount = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[0] === s[i + 1]) {
        xCount++;
      } else {
        notXCount++;
      }
      if (xCount === notXCount) {
        break;
      }
    }

    s = s.slice(xCount + notXCount);
    answer++;
  }
  return answer;
}