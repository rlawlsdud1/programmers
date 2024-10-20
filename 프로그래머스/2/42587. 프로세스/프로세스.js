function solution(priorities, location) {
  let answer = 0;
  const savedLocation = [];
  for (let i = 0; i < priorities.length; i += 1) {
    savedLocation.push(i);
  }

  while (priorities.length) {
    const maxValue = Math.max(...priorities);
    if (priorities[0] < maxValue) {
      priorities.push(priorities.shift());
      savedLocation.push(savedLocation.shift());
    } else {
      answer++;
      priorities.shift();
      if (savedLocation.shift() === location) {
        return answer;
      }
    }
  }
}