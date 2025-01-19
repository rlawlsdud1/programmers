function solution(n, computers) {
  const visited = Array.from({ length: n }).fill(false);

  function dfs(vertex) {
    for (let i = 0; i < n; i++) {
      if (!visited[i] && computers[vertex][i]) {
        visited[i] = true;
        dfs(i);
      }
    }
  }

  let answer = 0;

  // 0부터 돌기 시작
  // dfs(0) 호출
  // 첫번째 컴퓨터와 연결돼있는 것들 다 방문처리
  // 다음 반복때는 연결 안돼있는 컴퓨터부터 돌기 시작
  // 연결 한사이클 끝나면 answer++
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
      answer++;
    }
  }

  return answer;
}