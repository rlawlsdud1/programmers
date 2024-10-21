function solution(n, computers) {
  let count = 0;

  const visited = new Array(n).fill(false);

  function dfs(vertex) {
    visited[vertex] = true;

    for (let i = 0; i < n; i++) {
      if (!visited[i] && computers[vertex][i]) {
        dfs(i);
      }
    }
  }

  for (let i = 0; i < computers.length; i++) {
    if (!visited[i]) {
      count++;
      dfs(i);
    }
  }

  return count;
}