function solution(n, infection, edges, k) {
  let answer = 0;
  const pipes = [1, 2, 3];

  const tree = {};
  edges.forEach((v) => {
    const [x, y, type] = v;
    tree[x] ? tree[x].push([y, type]) : (tree[x] = [[y, type]]);
    tree[y] ? tree[y].push([x, type]) : (tree[y] = [[x, type]]);
  });

  function BT(count, prev, path) {
    if (count === k - 1) {
      const infectedInfo = Array.from({ length: n + 1 }).fill(false);
      infectedInfo[infection] = true;

      path.forEach((type) => {
        const visited = Array.from({ length: n + 1 }).fill(false);
        visited[infection] = true;

        DFS(infection, tree, type, infectedInfo, visited);
      });

      let count = 0;
      infectedInfo.forEach((v) => {
        if (v) count++;
      });
      answer = Math.max(answer, count);

      return;
    }

    pipes.forEach((v) => {
      if (v !== prev) {
        path.push(v);
        BT(count + 1, v, path);
        path.pop();
      }
    });
  }

  function DFS(node, tree, pipe, infectedInfo, visited) {
    tree[node].forEach((v) => {
      const [next, type] = v;

      // 현재 노드가 감염된 상태일 때,
      // 인접한 노드가 이미 감염된 상태거나
      // 감염된 상태가 아니라면 type === pipe일 때
      // 다음 노드 탐색

      if (infectedInfo[node] && !visited[next]) {
        if (infectedInfo[next] || type === pipe) {
          infectedInfo[next] = true;
          visited[next] = true;

          DFS(next, tree, pipe, infectedInfo, visited);
        }
      }
    });
  }

  pipes.forEach((v) => {
    BT(0, v, [v]);
  });

  return answer;
}