function solution(progresses, speeds) {
  const answer = [];

  while (progresses.length) {
    const n = progresses.length;
    for (let i = 0; i < n; i++) {
      progresses[i] += speeds[i];
    }

    let count = 0;

    while (progresses[0] >= 100) {
      progresses.shift();
      speeds.shift();
      count++;
    }

    if (count) answer.push(count);
  }

  return answer;
}