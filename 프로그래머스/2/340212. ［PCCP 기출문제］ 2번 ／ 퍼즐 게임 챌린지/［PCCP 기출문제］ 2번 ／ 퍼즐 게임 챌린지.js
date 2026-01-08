function solution(diffs, times, limit) {
  let [left, right] = [1, limit];
  let answer = Infinity;

  while (left <= right) {
    const level = Math.floor((left + right) / 2);

    let total_time = times[0];

    for (let i = 1; i < times.length; i++) {
      const time_cur = times[i];
      const time_prev = times[i - 1];
      const diff = diffs[i];

      if (diff <= level) {
        total_time += time_cur;
      } else {
        total_time += (time_cur + time_prev) * (diff - level) + time_cur;
      }
    }

    if (total_time <= limit) {
      right = level - 1;
      answer = Math.min(answer, level);
    } else left = level + 1;
  }

  return answer;
}