function solution(numbers) {
  const n = numbers.length;
  const answer = Array.from({ length: n }).fill(-1);
  const stack = [];

  for (let i = n - 1; i >= 0; i--) {
    while (stack.at(-1) <= numbers[i]) {
      stack.pop();
    }

    if (stack.length) {
      answer[i] = stack.at(-1);
    }

    stack.push(numbers[i]);
  }

  return answer;
}