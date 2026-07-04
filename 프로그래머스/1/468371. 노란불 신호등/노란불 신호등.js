function solution(signals) {
  const n = signals.length;
  const sumOfSignals = signals.map((v) => v.reduce((acc, cur) => acc + cur, 0));
  const lcm = lcmOfArray(sumOfSignals);

  for (let t = 1; t <= lcm; t++) {
    let all_yellow = true;

    // 각 신호등들이 특정 시점(t)에 노란불인지 체크
    for (let i = 0; i < n; i++) {
      const [G, Y, R] = signals[i];
      const sum = G + Y + R;

      let corrected_time = t % sum;
      if (corrected_time === 0) corrected_time = sum;

      if (corrected_time <= G || corrected_time > G + Y) all_yellow = false;

      if (!all_yellow) break; // 노란불 아니면 특정 시점은 더 이상 볼 필요 없음
    }

    // 특정 시점에 전부 노란불이라면 t return
    if (all_yellow) return t;
  }

  return -1;
}

function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function lcmOfArray(arr) {
  return arr.reduce((acc, cur) => lcm(acc, cur));
}