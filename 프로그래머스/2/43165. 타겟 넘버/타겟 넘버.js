function solution(numbers, target) {
  let answer = 0;

  function DFS(index, sum) {
    if (index === numbers.length) {
      if (sum === target) {
        answer++;
      }
      return;
    } else {
      DFS(index + 1, sum + numbers[index]);
      DFS(index + 1, sum - numbers[index]);
    }
  }

  DFS(1, numbers[0]);
  DFS(1, -numbers[0]);

  return answer;
}