function solution(n, edge) {
  const graph = [[]];
  for (let i = 1; i <= n; i++) {
    graph[i] = [];
  }
  const visited = Array.from({ length: n + 1 }).fill(false);

  for (let i = 0; i < edge.length; i++) {
    graph[edge[i][0]].push(edge[i][1]);
    graph[edge[i][1]].push(edge[i][0]);
  }

  function bfs(startNode) {
    const queue = [];
    const distances = Array.from({ length: n + 1 }).fill(0);

    visited[startNode] = true;
    queue.push(startNode);

    while (queue.length > 0) {
      const node = queue.shift();

      const adjacentNodes = graph[node];
      for (let i = 0; i < adjacentNodes.length; i++) {
        const adjacentNode = adjacentNodes[i];
        if (!visited[adjacentNode]) {
          visited[adjacentNode] = true;
          queue.push(adjacentNode);
          distances[adjacentNode] = distances[node] + 1;
        }
      }
    }

    return distances;
  }

  const distances = bfs(1).sort((a, b) => a - b);

  return distances.filter((v) => v === distances.at(-1)).length;
}