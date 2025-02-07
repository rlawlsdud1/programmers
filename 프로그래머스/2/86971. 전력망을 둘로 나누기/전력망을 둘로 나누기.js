function solution(n, wires) {
  const adjacantList = Array.from({ length: n + 1 }, () => []);
  wires.forEach((v) => {
    const [from, at] = v;
    adjacantList[from].push(at);
    adjacantList[at].push(from);
  });

  let answer = Infinity;

  for (let i = 0; i < wires.length; i++) {
    const copyList = JSON.parse(JSON.stringify(adjacantList));
    const [from, at] = wires[i];
    copyList[from] = copyList[from].filter((v) => v !== at);
    copyList[at] = copyList[at].filter((v) => v !== from);
    const visited = Array.from({ length: n + 1 }).fill(false);

    function DFS(node) {
      let count = 1;

      for (let i = 0; i < copyList[node].length; i++) {
        const adjacantNode = copyList[node][i];
        if (!visited[adjacantNode]) {
          visited[adjacantNode] = true;
          count += DFS(adjacantNode);
        }
      }

      return count;
    }
    visited[1] = true;
    const count = DFS(1);
    answer = Math.min(answer, Math.abs(n - 2 * count));
  }

  return answer;
}