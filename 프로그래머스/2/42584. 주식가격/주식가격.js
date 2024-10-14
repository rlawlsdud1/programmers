function solution(prices) {
  let answer = [];
  let n = prices.length;
  let second = 0;

  for (let i = 0; i < n; i++) {
    if (i === n - 1) {
      answer.push(0);
      break;
    }
    for (let j = i + 1; j <= n - 1; j++) {
      if (prices[i] <= prices[j]) {
        second++;
      } else if (prices[i] > prices[j]) {
        answer.push(second + 1);
        second = 0;
        break;
      }

      if (j === n - 1) {
        answer.push(second);
        second = 0;
      }
    }
  }
  return answer;
}