function solution(arr) {
  let cur = arr[0];
  const answer = [cur];

  for (let i = 1; i < arr.length; i++) {
    if (cur !== arr[i]) {
      cur = arr[i];
      answer.push(cur);
    }
  }

  return answer;
}
