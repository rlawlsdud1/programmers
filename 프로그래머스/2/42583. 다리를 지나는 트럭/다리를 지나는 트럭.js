function solution(bridge_length, weight, truck_weights) {
  let count = 0;
  const bridge = Array.from({ length: bridge_length }).fill(0);

  while (1) {
    // 종료 조건
    if (count > 1 && bridge.reduce((acc, cur) => acc + cur, 0) === 0) {
      break;
    }

    bridge.shift();
    if (truck_weights.length) {
      if (
        bridge.reduce((acc, cur) => acc + cur, 0) + truck_weights[0] <=
        weight
      ) {
        bridge.push(truck_weights.shift());
      } else {
        bridge.push(0);
      }
    }
    count++;
  }

  return count;
}