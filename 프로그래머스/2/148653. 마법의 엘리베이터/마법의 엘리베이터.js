function solution(storey) {
  let answer = 0;

  const splitted_storey = String(storey).split("").map(Number);

  for (let i = splitted_storey.length - 1; i > 0; i--) {
    const cur = splitted_storey[i];

    if (cur > 5) {
      answer += 10 - cur;
      splitted_storey[i - 1]++;
    } else if (cur < 5) {
      answer += cur;
    } else {
      answer += cur;
      if (splitted_storey[i - 1] >= 5) splitted_storey[i - 1]++;
    }
  }

  const last = splitted_storey[0];
  if (last > 5) answer += 10 - last + 1;
  else answer += last;

  return answer;
}