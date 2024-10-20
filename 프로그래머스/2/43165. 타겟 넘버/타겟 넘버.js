function solution(numbers, target) {
  var answer = 0;
  const length = numbers.length;
  function dfs(count, sum) {
    if (length === count) {
      if (target === sum) {
        answer++;
      }
      return;
    }
    dfs(count + 1, sum + numbers[count]);
    dfs(count + 1, sum - numbers[count]);
  }

  dfs(0, 0);
  return answer;
}