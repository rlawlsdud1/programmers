function solution(tickets) {
  const answer = [];
  const visited = Array.from({ length: tickets.length }).fill(false);
  tickets.sort();

  function dfs(start, path) {
    for (let i = 0; i < tickets.length; i++) {
      if (!visited[i] && start === tickets[i][0]) {
        visited[i] = true;
        path.push(tickets[i][1]);
        if (path.length === tickets.length + 1) {
          answer.push([...path]);
        }

        dfs(tickets[i][1], path);
        visited[i] = false;
        path.pop();
      }
    }
  }

  dfs("ICN", ["ICN"]);

  return answer[0];
}