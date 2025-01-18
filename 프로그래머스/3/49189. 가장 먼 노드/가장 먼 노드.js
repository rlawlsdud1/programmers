function solution(n, edge) {
  const adjacantList = {};
  edge.forEach((e) => {
    adjacantList[e[0]]
      ? adjacantList[e[0]].push(e[1])
      : (adjacantList[e[0]] = [e[1]]);
    adjacantList[e[1]]
      ? adjacantList[e[1]].push(e[0])
      : (adjacantList[e[1]] = [e[0]]);
  });

  const visited = Array.from({ length: n + 1 }).fill(false);
  const distances = Array.from({ length: n + 1 }).fill(0);

  const queue = [];
  queue.push(1); // 1번 노드부터 시작
  visited[1] = true;

  while (queue.length) {
    const node = queue.shift();
    const adjacantNodes = adjacantList[node];

    for (let i = 0; i < adjacantNodes.length; i++) {
      if (!visited[adjacantNodes[i]]) {
        visited[adjacantNodes[i]] = true;
        queue.push(adjacantNodes[i]);
        distances[adjacantNodes[i]] = distances[node] + 1;
      }
    }
  }

  distances.sort((a, b) => a - b);

  return distances.filter((v) => v === distances.at(-1)).length;
}