function solution(k, m, score) {
  if (m > score.length) {
    return 0;
  }
  let answer = 0;
  score.sort((a, b) => b - a);
  for (let i = 0; i < score.length; i += m) {
    const slicedScore = score.slice(i, i + m);
    if (slicedScore.length === m) {
      answer += Math.min(...slicedScore) * m;
    }
  }
  return answer;
}