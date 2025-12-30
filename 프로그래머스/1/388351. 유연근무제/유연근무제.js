function solution(schedules, timelogs, startday) {
  const weekend = [6, 7];
  const n = schedules.length;

  let answer = 0;

  for (let i = 0; i < n; i++) {
    const curTimeLog = timelogs[i];
    const curWorkTime = schedules[i];
    const hour = Math.floor(curWorkTime / 100);
    const minute = curWorkTime - hour * 100;
    const convertedTime = hour * 60 + minute;

    let count = 0;
    let day = startday;

    for (let j = 0; j < 7; j++) {
      if (!weekend.includes(day)) {
        const hour = Math.floor(curTimeLog[j] / 100);
        const minute = curTimeLog[j] - hour * 100;
        const actualWorkTime = hour * 60 + minute;

        if (actualWorkTime <= convertedTime + 10) count++;
      }

      ++day;
      if (day === 8) day = 1;
    }
    if (count === 5) answer++;
  }

  return answer;
}