function solution(n, edge) {
  const adjacantList = Array.from({ length: n + 1 }, () => []);
  edge.forEach((v) => {
    const [from, to] = v;
    adjacantList[from].push(to);
    adjacantList[to].push(from);
  });

  const visited = Array.from({ length: n + 1 }).fill(false);
  const distances = Array.from({ length: n + 1 }).fill(0);
  const queue = [];
  visited[1] = true;
  distances[1] = 0;
  queue.push([1, 0]);

  while (queue.length) {
    const [node, distance] = queue.shift();
    const adjacantNodes = adjacantList[node];
    for (let i = 0; i < adjacantNodes.length; i++) {
      const adjacantNode = adjacantNodes[i];

      if (!visited[adjacantNode]) {
        visited[adjacantNode] = true;
        queue.push([adjacantNode, distance + 1]);
        distances[adjacantNode] = distance + 1;
      }
    }
  }
  const maxValue = distances.sort((a, b) => b - a)[0];
  return distances.filter((v) => v === maxValue).length;
}