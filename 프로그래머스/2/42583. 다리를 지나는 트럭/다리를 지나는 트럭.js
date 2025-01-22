function solution(bridge_length, weight, truck_weights) {
  let count = 0;
  const n = truck_weights.length;
  const bridgeArr = Array.from({ length: bridge_length }).fill(0);
  const complete = [];
  while (1) {
    if (complete.length === n) {
      break;
    }

    const outOfBridge = bridgeArr.shift();
    if (outOfBridge) {
      complete.push(outOfBridge);
    }

    if (truck_weights[0] + sumOfTrucks(bridgeArr) <= weight) {
      bridgeArr.push(truck_weights.shift());
    } else {
      bridgeArr.push(0);
    }

    count++;
  }

  return count;
}

function sumOfTrucks(bridge) {
  return bridge.reduce((acc, cur) => acc + cur, 0);
}