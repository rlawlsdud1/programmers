function solution(begin, target, words) {
  let answer = Infinity;

  const visited = Array.from({ length: words.length }).fill(false);
  function DFS(word, count) {
    if (word === target) {
      answer = Math.min(answer, count);
      return;
    }
    for (let i = 0; i < words.length; i++) {
      if (!visited[i] && canChange(word, words[i])) {
        visited[i] = true;

        DFS(words[i], count + 1);
        visited[i] = false;
      }
    }
  }

  DFS(begin, 0);

  if (answer === Infinity) {
    return 0;
  }

  return answer;
}

function canChange(str1, str2) {
  let count = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      count++;
    }
    if (count > 1) {
      return false;
    }
  }
  return true;
}