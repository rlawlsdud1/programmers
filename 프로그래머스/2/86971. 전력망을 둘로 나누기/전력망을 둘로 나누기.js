function solution(n, wires) {
  let answer = Infinity;
  const adjacantList = Array.from({ length: n + 1 }, () => []);
  wires.forEach((v) => {
    const [from, to] = v;
    adjacantList[from].push(to);
    adjacantList[to].push(from);
  });

  wires.forEach((v) => {
    const [from, to] = v;
    const adjacantListCopy = JSON.parse(JSON.stringify(adjacantList));
    adjacantListCopy[from] = adjacantListCopy[from].filter((v) => v !== to);
    adjacantListCopy[to] = adjacantListCopy[to].filter((v) => v !== from);

    const visited = Array.from({ length: n + 1 }).fill(false);

    function DFS(vertex) {
      if (!visited[vertex]) {
        visited[vertex] = true;
        for (let i = 0; i < adjacantListCopy[vertex].length; i++) {
          DFS(adjacantListCopy[vertex][i]);
        }
      }
    }
    let network = 0;
    let temp;
    for (let i = 1; i <= n; i++) {
      if (!visited[i]) {
        DFS(i);
        network++;
      }
      if (i === 1) {
        temp = Math.abs(2 * visited.filter((v) => v === true).length - n);
      }
    }
    if (network === 2) {
      answer = Math.min(answer, temp);
    }
  });

  return answer;
}