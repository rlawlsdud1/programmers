function solution(begin, target, words) {
  const visited = Array.from({ length: words.length }).fill(false);
  let answer = Infinity;
  function DFS(word, count) {
    if (word === target) {
      answer = Math.min(answer, count);
    }
    for (let i = 0; i < words.length; i++) {
      if (!visited[i] && checkCanChange(word, words[i])) {
        visited[i] = true;
        DFS(words[i], count + 1);

        visited[i] = false;
      }
    }
  }
  DFS(begin, 0);
  if (answer !== Infinity) return answer;
  return 0;
}

function checkCanChange(str1, str2) {
  let count = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) count++;
  }
  if (count === 1) return true;
  return false;
}