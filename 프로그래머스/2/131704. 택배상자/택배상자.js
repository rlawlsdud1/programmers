function solution(order) {
  let answer = 0;

  const container = Array.from({ length: order.length });

  order.forEach((v, i) => {
    container[v - 1] = i + 1;
  });

  container.reverse();

  let cur = 1;
  const sub_container = [];

  while (1) {
    if (cur === container.at(-1)) {
      cur++;
      container.pop();
      answer++;
    } else if (cur === sub_container.at(-1)) {
      cur++;
      sub_container.pop();
      answer++;
    } else if (container.length) {
      sub_container.push(container.pop());
    } else {
      break;
    }
  }

  return answer;
}