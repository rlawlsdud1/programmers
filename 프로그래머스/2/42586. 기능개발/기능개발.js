function solution(progresses, speeds) {
  // 1. progresses[i] 에 speeds[i] 를 계속 더한다
  // 2. progresses[0] 이 100 넘는지 확인한다
  // 3. 그렇다면 shift, 그 이후것도 100 넘는지 확인
  // 4. 반복하고 안넘는다면 다시 1번 반복
  const answer = [];

  while (progresses.length) {
    for (let i = 0; i < progresses.length; i++) {
      progresses[i] += speeds[i];
    }

    let count = 0;
    while (progresses[0] >= 100) {
      progresses.shift();
      speeds.shift();
      count++;
    }

    if (count) {
      answer.push(count);
    }
  }
  return answer;
}