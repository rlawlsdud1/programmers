function solution(n, wires) {
  let answer = Infinity;
  const adjacantList = {};
  for (let k = 1; k <= n; k++) {
    adjacantList[k] = [];
  }
  for (let k = 0; k < wires.length; k++) {
    const [from, to] = wires[k];
    adjacantList[from].push(to);
    adjacantList[to].push(from);
  }

  for (let i = 0; i < wires.length; i++) {
    const [from, at] = wires[i];
    const deepCopy = JSON.parse(JSON.stringify(adjacantList));
    deepCopy[from] = deepCopy[from].filter((v) => v !== at);
    deepCopy[at] = deepCopy[at].filter((v) => v !== from);
    const visited = Array.from({ length: n + 1 }).fill(false);
    function DFS(vertex) {
      if (!visited[vertex]) {
        visited[vertex] = true;

        for (let i = 0; i < deepCopy[vertex].length; i++) {
          if (!visited[deepCopy[vertex][i]]) {
            DFS(deepCopy[vertex][i]);
          }
        }
      }
    }

    let difference;
    let another;
    let count = 0;
    for (let k = 1; k <= n; k++) {
      if (!visited[k]) {
        DFS(k);
        if (k === 1) {
          another = n - visited.filter((v) => v === true).length;
          difference = Math.abs(
            visited.filter((v) => v === true).length - another
          );
        }
        count++;
      }
    }
    if (count === 2) {
      if (difference === 0) {
        return 0;
      }
      answer = Math.min(answer, difference);
    }
  }

  return answer;
}