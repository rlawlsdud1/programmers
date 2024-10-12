function solution(citations) {
  citations.sort((a, b) => a - b);
  let answer = 0;
  for (let i = 0; i < citations.length; i++) {
    const count = citations.filter((e) => e >= citations[i]).length;
    if (Math.min(count, citations[i]) > answer) {
      answer = Math.min(count, citations[i]);
    }
  }
  return answer;
}