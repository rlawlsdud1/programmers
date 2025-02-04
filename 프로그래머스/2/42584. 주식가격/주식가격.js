function solution(prices) {
  const answer = Array.from({ length: prices.length }).fill(0);
  const stack = [];

  for (let i = 0; i < prices.length; i++) {
    //                     가격이 줄어들었다면
    while (stack.length && prices[stack.at(-1)] > prices[i]) {
      const j = stack.pop();
      answer[j] = i - j;
    }

    stack.push(i);
  }

  while (stack.length) {
    const i = stack.pop();
    answer[i] = prices.length - 1 - i;
  }

  return answer;
}