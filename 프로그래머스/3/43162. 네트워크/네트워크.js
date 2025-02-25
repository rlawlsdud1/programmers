function solution(n, computers) {
  const visited = Array.from({ length: n }).fill(false);

  function DFS(node) {
    for (let i = 0; i < n; i++) {
      if (!visited[i] && computers[node][i]) {
        visited[i] = true;
        DFS(i);
      }
    }
  }

  let count = 0;

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      DFS(i);
      count++;
    }
  }

  return count;
}