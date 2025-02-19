function solution(n, results) {
  // 이긴 사람 기준
  let winnerGraph = Array.from({ length: n + 1 }, () => []);

  // 진 사람 기준
  let loserGraph = Array.from({ length: n + 1 }, () => []);

  results.forEach((v) => {
    const [winner, loser] = v;
    winnerGraph[winner].push(loser);
    loserGraph[loser].push(winner);
  });

  function BFS(graph, player) {
    const visited = Array.from({ length: n + 1 }).fill(false);
    let result = 0;
    const queue = [];
    queue.push(player);
    visited[player] = true;

    while (queue.length) {
      const player = queue.shift();
      for (let i = 0; i < graph[player].length; i++) {
        const relatedPlayer = graph[player][i];
        if (!visited[relatedPlayer]) {
          visited[relatedPlayer] = true;
          queue.push(relatedPlayer);
          result++;
        }
      }
    }

    return result;
  }

  let answer = 0;

  for (let i = 1; i <= n; i++) {
    if (BFS(winnerGraph, i) + BFS(loserGraph, i) === n - 1) {
      answer++;
    }
  }

  return answer;
}