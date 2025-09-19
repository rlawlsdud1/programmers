function solution(scores) {
  let N = scores.length;
  const wanho = scores[0];

  scores.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return b[0] - a[0];
  });

  // 어떤 사람은 앞에 있는 사람보다 근무 태도 점수가 같거나 작다.
  // 즉, 동료 평가 점수라도 좋아야 한다.
  // 동료 평가 점수가 지금까지 기록된 것중에 가장 높은 것보다 '미만' 이라면,
  // 인센 대상에서 제외된다.

  let max_peer_score = -Infinity;
  const incenCandidate = [];

  for (let i = 0; i < N; i++) {
    const [_, b] = scores[i];

    if (b >= max_peer_score) {
      incenCandidate.push(scores[i]);
      max_peer_score = Math.max(b, max_peer_score);
    }
  }

  incenCandidate.sort((a, b) => {
    return b[0] + b[1] - (a[0] + a[1]);
  });

  let rank = 1,
    count = 0,
    prevSum = -Infinity;

  for (let i = 0; i < incenCandidate.length; i++) {
    const [a, b] = incenCandidate[i];
    const curSum = a + b;

    if (prevSum > curSum) {
      rank += count;
      count = 0;
    }

    prevSum = curSum; // 앞에 사원이랑만 비교하면 됨.
    count++;

    if (a === wanho[0] && b === wanho[1]) return rank;
  }

  return -1;
}