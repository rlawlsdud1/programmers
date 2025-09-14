function solution(cap, n, deliveries, pickups) {
  let answer = 0;

  // stack에 있는건 수거 혹은 픽업해야 하는 집 번호 index
  const deliveryStack = [];
  const pickupStack = [];

  deliveries.forEach((v, i) => {
    if (v !== 0) deliveryStack.push(i);
  });

  pickups.forEach((v, i) => {
    if (v !== 0) pickupStack.push(i);
  });

  // 둘 중 하나라도 남아있으면, 진행
  // 둘 다 비워지면 끝
  while (deliveryStack.length || pickupStack.length) {
    let dist = Math.max(
      deliveryStack[deliveryStack.length - 1] || 0,
      pickupStack[pickupStack.length - 1] || 0
    );

    answer += (dist + 1) * 2;

    let remainDeliv = cap;
    while (deliveryStack.length) {
      const idx = deliveryStack[deliveryStack.length - 1];

      if (remainDeliv - deliveries[idx] >= 0) {
        remainDeliv -= deliveries[idx];
        deliveryStack.pop();
      } else {
        deliveries[idx] -= remainDeliv;
        break;
      }
    }

    let remainPickup = cap;
    while (pickupStack.length) {
      const idx = pickupStack[pickupStack.length - 1];

      if (remainPickup - pickups[idx] >= 0) {
        remainPickup -= pickups[idx];
        pickupStack.pop();
      } else {
        pickups[idx] -= remainPickup;
        break;
      }
    }
  }

  return answer;
}