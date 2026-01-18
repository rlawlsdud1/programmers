function solution(k, ranges) {
  const y_values = [k];

  while (k !== 1) {
    if (k % 2 === 1) k = k * 3 + 1;
    else k = k / 2;

    y_values.push(k);
  }

  const n = y_values.length - 1;
  const definite_integral_arr = Array.from({ length: n });

  for (let x = 0; x < n; x++) {
    const [x_1, y_1] = [x, y_values[x]];
    const [x_2, y_2] = [x + 1, y_values[x + 1]];
    const a = y_2 - y_1; // 기울기
    const b = a * -x_1 + y_1; // y절편

    const definite_integral =
      (1 / 2) * (a * x_2 ** 2 - a * x_1 ** 2) + b * x_2 - b * x_1;

    definite_integral_arr[x] = definite_integral;
  }

  const prefix_sum = Array.from({ length: n });
  prefix_sum[0] = definite_integral_arr[0];

  for (let x = 1; x < n; x++) {
    prefix_sum[x] = prefix_sum[x - 1] + definite_integral_arr[x];
  }

  // 단, 주어진 구간의 시작점이 끝점보다 커서 유효하지 않은 구간이 주어질 수 있으며 이때의 정적분 결과는 -1로 정의합니다.

  const result = [];
  ranges.forEach((range) => {
    const [a, b] = [range[0], n + range[1]];

    if (a === b) result.push(0);
    else {
      if (a > b) {
        result.push(-1);
      } else {
        result.push(
          prefix_sum[b - 1] - (prefix_sum[a - 1] ? prefix_sum[a - 1] : 0),
        );
      }
    }
  });

  return result;
}