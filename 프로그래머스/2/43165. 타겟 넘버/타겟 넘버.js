function solution(numbers, target) {
  let answer = 0;

  function DFS(number, count) {
    if (count === numbers.length) {
      if (number === target) {
        answer++;
      }
      return;
    }

    DFS(number + numbers[count], count + 1);
    DFS(number - numbers[count], count + 1);
  }

  DFS(0, 0);
  return answer;
}