function solution(n, computers) {
  const visited = Array.from({ length: n }).fill(false);

  function DFS(computer) {
    for (let i = 0; i < n; i++) {
      if (!visited[i] && computers[computer][i]) {
        visited[i] = true;
        DFS(i);
      }
    }
  }
  let answer = 0;
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      DFS(i);
      answer++;
    }
  }

  return answer;
}