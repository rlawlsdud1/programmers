function solution(bridge_length, weight, truck_weights) {
  const n = truck_weights.length;
  let answer = 0;

  const bridge = Array.from({ length: bridge_length }).fill(0);
  let sum = 0; // 현재 다리 위에 있는 트럭들의 무게 합
  let count = 0; // 다리를 지난 트럭 수

  while (count < n) {
    const next = truck_weights[0];

    // 이번에 다리를 건너는 트럭이 있는지
    if (bridge[0]) {
      if (sum - bridge[0] + next <= weight) {
        bridge.push(next);
        sum += next;
        truck_weights.shift();
      } else bridge.push(0);

      sum -= bridge[0];
      count++;
    } else {
      if (sum + next <= weight) {
        bridge.push(next);
        sum += next;
        truck_weights.shift();
      } else bridge.push(0);
    }

    bridge.shift();

    answer++;
  }

  return answer;
}