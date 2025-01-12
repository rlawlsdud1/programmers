function solution(sequence, k) {
  let [l, r] = [0, 0];
  let sum = sequence[l];
  const answer = [];

  while (r < sequence.length) {
    if (sum < k) {
      sum += sequence[++r];
    } else if (sum > k) {
      sum -= sequence[l++];
    } else {
      answer.push([l, r]);
      sum += sequence[++r];
      sum -= sequence[l++];
    }
  }
  return answer.sort((a, b) => a[1] - a[0] - (b[1] - b[0]))[0];
}