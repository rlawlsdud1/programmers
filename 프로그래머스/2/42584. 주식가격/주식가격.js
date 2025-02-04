function solution(prices) {
  const answer = Array.from({ length: prices.length }).fill(0);
  const stack = [];

  for (let i = 0; i < prices.length; i++) {
    while (stack.length && prices[stack.at(-1)] > prices[i]) {
      const j = stack.pop();
      answer[j] = i - j;
    }

    stack.push(i);
  }
  // stack에 있는 원소는 끝내 안떨어진 주식의 index

  while (stack.length) {
    const j = stack.pop();
    // prices 의 lastIndex - j 는 j 번째 주식이 안떨어진 기간(초)
    answer[j] = prices.length - 1 - j;
  }

  return answer;
    
}