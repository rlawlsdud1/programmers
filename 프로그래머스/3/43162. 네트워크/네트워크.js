function solution(n, computers) {
  let count = 0;
  const visited = new Array(n).fill(false);

  function DFS(vertex) {
    visited[vertex] = true;

    for (let i = 0; i < computers[vertex].length; i++) {
      if (!visited[i] && computers[vertex][i]) {
        DFS(i);
      }
    }
  }

  for (let i = 0; i < computers.length; i++) {
    if (!visited[i]) {
      count++;
      DFS(i);
    }
  }

  return count;
}