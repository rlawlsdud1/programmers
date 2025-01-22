function solution(n, computers) {
  let answer = 0;

  const visited = Array.from({ length: n }).fill(false);

  function DFS(vertex) {
    for (let i = 0; i < computers[vertex].length; i++) {
      if (!visited[i] && computers[vertex][i]) {
        visited[i] = true;
        DFS(i);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    // 방문 안했으면 한 곳으로 쭉 뚫고 방문처리.
    if (!visited[i]) {
      DFS(i);
      answer++;
    }
  }

  return answer;
}