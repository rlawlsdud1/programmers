function solution(bridge_length, weight, truck_weights) {
  let count = 0;

  // 다리 위에 있는 트럭들을 담은 배열
  const onBridge = [];

  // 대기 중인 트럭이 다 빠지고, 다리 위에 트럭이 없을때까지 반복
  while (truck_weights.length || onBridge.filter((e) => e !== 0).length) {
    // 다리 길이를 초과한 경우 다리에서 트럭 제거
    if (onBridge.length >= bridge_length) {
      onBridge.shift();
    }
    // 다리 위에 있는 트럭들의 무게 합
    const bridgeSum = onBridge.reduce((total, e) => total + e, 0);
    if (
      bridgeSum + truck_weights[0] <= weight &&
      onBridge.length < bridge_length
    ) {
      // 트럭을 다리에 올림
      count++;
      onBridge.push(truck_weights.shift());
    } else {
      // 트럭을 올릴 수 없으면 다리 길이를 유지하기 위해 0을 추가
      count++;
      onBridge.push(0);
    }
  }
  return count;
}