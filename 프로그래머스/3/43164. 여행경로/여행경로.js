function solution(tickets) {
  const answer = [];
  tickets.sort();
  const visited = Array.from({ length: tickets.length }).fill(false);

  function DFS(path) {
    if (path.length === tickets.length + 1) {
      answer.push([...path]);
    }

    for (let i = 0; i < tickets.length; i++) {
      if (!visited[i] && path.at(-1) === tickets[i][0]) {
        visited[i] = true;
        path.push(tickets[i][1]);
        DFS(path);
        visited[i] = false;
        path.pop();
      }
    }
  }
  DFS(["ICN"], 0);
  return answer[0]
}