function solution(n, stations, w) {
  let answer = 0;
  let cur = 1;
  const cover_range = 2 * w + 1;

  stations.forEach((s) => {
    answer += Math.ceil((s - w - cur) / cover_range);
    cur = s + w + 1;
  });

  if (cur <= n) answer += Math.ceil((n - cur + 1) / cover_range);

  return answer;
}