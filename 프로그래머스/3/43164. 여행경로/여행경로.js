function solution(tickets) {
  const answer = [];
  tickets.sort();
  const visited = Array.from({ length: tickets.length }).fill(false);

  function DFS(start, path) {
    if (path.length === tickets.length + 1) {
      answer.push([...path]);
    }
    for (let i = 0; i < tickets.length; i++) {
      // 안쓴 티켓이고, 유효한 티켓이라면
      if (tickets[i][0] === start && !visited[i]) {
        visited[i] = true;
        path.push(tickets[i][1]);

        DFS(tickets[i][1], path);
        visited[i] = false;
        path.pop();
      }
    }
  }

  DFS("ICN", ["ICN"]);

  return answer[0];
}