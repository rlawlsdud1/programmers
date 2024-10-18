function solution(n, words) {
  const answer = [];
  const usedWords = [];
  for (let i = 1; i < words.length; i++) {
    usedWords.push(words[i - 1]);
    if (
      !words[i].startsWith(usedWords.at(-1).at(-1)) ||
      usedWords.includes(words[i])
    ) {
      if ((i + 1) % n === 0) {
        answer.push(n);
      } else {
        answer.push((i + 1) % n);
      }
      answer.push(Math.ceil((i + 1) / n));
      return answer;
    }
  }
  return [0, 0];
}