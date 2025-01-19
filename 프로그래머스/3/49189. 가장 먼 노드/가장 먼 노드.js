function solution(n, edge) {
  const adjacantList = {};
  for (let i = 0; i < edge.length; i++) {
    adjacantList[edge[i][0]]
      ? adjacantList[edge[i][0]].push(edge[i][1])
      : (adjacantList[edge[i][0]] = [edge[i][1]]);
    adjacantList[edge[i][1]]
      ? adjacantList[edge[i][1]].push(edge[i][0])
      : (adjacantList[edge[i][1]] = [edge[i][0]]);
  }
  // 노드 번호와 인덱스 맞춰주기 위해 n+1 로 설정
  const visited = Array.from({ length: n + 1 }).fill(false);
  const distances = Array.from({ length: n + 1 }).fill(0);
  const queue = [];
  queue.push([1, 0]); // 1번 노드와 거리 push
  visited[1] = true;

  while (queue.length) {
    const [node, distance] = queue.shift();

    for (let i = 0; i < adjacantList[node].length; i++) {
      const adjacantNode = adjacantList[node][i];

      if (!visited[adjacantNode]) {
        visited[adjacantNode] = true;
        queue.push([adjacantNode, distance + 1]);
        distances[adjacantNode] = distance + 1;
      }
    }
  }
  distances.sort((a, b) => a - b);
  return distances.filter((v) => v === distances.at(-1)).length;
}