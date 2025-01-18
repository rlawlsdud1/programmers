function solution(n, computers) {
  answer = 0;
  const visited = Array.from({ length: n }).fill(false);

  function DFS(vertex) {
    for (let i = 0; i < n; i++) {
      if (!visited[i] && computers[vertex][i]) {
        visited[i] = true;
        DFS(i);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      DFS(i);
      answer++;
    }
  }

  return answer;
}