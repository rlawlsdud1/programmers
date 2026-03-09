function solution(priorities, location) {
  // 위치를 기억하기 위한 parsing
  priorities.forEach((v, i) => {
    priorities[i] = [v, i];
  });

  let count = 0; // 몇번째로 실행되는지

  while (priorities.length) {
    const n = priorities.length;
    const [target_priority, target_location] = priorities.shift();

    let can_execute = true;
    for (let i = 0; i < n - 1; i++) {
      const priority = priorities[i][0];

      // 우선순위 높은게 있다면 다시 큐에 넣음
      if (target_priority < priority) {
        priorities.push([target_priority, target_location]);
        can_execute = false;
        break;
      }
    }

    if (can_execute) {
      count++;
      if (target_location === location) return count;
    }
  }
}