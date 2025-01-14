function solution(begin, target, words) {
  if (!words.includes(target)) {
    return 0;
  }
  let answer = words.length;
  const visited = Array.from({ length: words.length }).fill(false);

  function dfs(str, count) {
    for (let i = 0; i < words.length; i++) {
      if (!visited[i] && canChange(str, words[i])) {
        visited[i] = true;

        // 여기에 도달해야 answer가 갱신된다
        // 여기에 도달하지 못했다면 answer는 여전히 words.length
        if (words[i] === target) {
          answer = Math.min(answer, count + 1);
        }

        dfs(words[i], count + 1);
        visited[i] = false;
      }
    }
  }

  dfs(begin, 0);

  // if (answer === words.length) {
  //   return 0;
  // }

  return answer;
}

function canChange(str1, str2) {
  let count = 0;

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      count++;
    }
  }
  if (count === 1) return true;
  return false;
}