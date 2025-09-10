function solution(edges) {
  const answer = Array.from({ length: 4 }).fill(0);
  const graph = {};
  const undirectedGraph = {};
  const allNodes = new Set();
  const visited = new Set();

  function BFS(node, temp) {
    const queue = [];
    queue.push(node);

    while (queue.length) {
      const nextNode = queue.shift();

      if (undirectedGraph[nextNode]) {
        for (const adjacantNode of undirectedGraph[nextNode]) {
          if (!visited.has(adjacantNode)) {
            visited.add(adjacantNode);
            temp.push(adjacantNode);
            queue.push(adjacantNode);
          }
        }
      }
    }
  }

  edges.forEach((v) => {
    const [a, b] = v;
    graph[a] ? graph[a].push(b) : (graph[a] = [b]);

    if (a !== b) {
      undirectedGraph[a]
        ? undirectedGraph[a].push(b)
        : (undirectedGraph[a] = [b]);
      undirectedGraph[b]
        ? undirectedGraph[b].push(a)
        : (undirectedGraph[b] = [a]);
    }

    allNodes.add(a);
    allNodes.add(b);
  });

  const inOutInfo = {};

  allNodes.forEach((v) => {
    // 특정 정점에서 나가는 간선의 개수 체크
    if (inOutInfo[v]) {
      if (graph[v]) inOutInfo[v][0] += graph[v].length;
    } else {
      if (graph[v]) inOutInfo[v] = [graph[v].length, 0];
      else inOutInfo[v] = [0, 0];
    }

    // 특정 정점에서 들어오는 간선 체크
    graph[v]?.forEach((e) => {
      if (inOutInfo[e]) inOutInfo[e][1] += 1;
      else inOutInfo[e] = [0, 1];
    });
  });

  let targetNode; // 생성 정점

  allNodes.forEach((v) => {
    if (inOutInfo[v][0] >= 2 && inOutInfo[v][1] === 0) targetNode = v;
  });

  allNodes.forEach((v) => {
    if (undirectedGraph[v]) {
      undirectedGraph[v] = undirectedGraph[v].filter((e) => e !== targetNode);
    }
  });

  answer[0] = targetNode;
  graph[targetNode].forEach((v) => inOutInfo[v][1]--);
  allNodes.delete(targetNode);

  allNodes.forEach((v) => {
    const temp = [];

    if (!visited.has(v)) {
      visited.add(v);
      temp.push(v);

      BFS(v, temp);
      answer[findTypeOfGraph(temp, inOutInfo)]++;
    }
  });

  return answer;
}

function findTypeOfGraph(info, inOutInfo) {
  let count = 0;
  for (let i = 0; i < info.length; i++) {
    const cur = info[i]; // 그래프를 이루는 각 노드
    if (inOutInfo[cur][0] === 2 && inOutInfo[cur][1] === 2) count++;
  }

  if (count === 1) return 3;

  let canContinue = true;

  for (let i = 0; i < info.length; i++) {
    const cur = info[i];
    if (inOutInfo[cur][0] === 1 && inOutInfo[cur][1] === 1) continue;

    canContinue = false;
  }

  return canContinue ? 1 : 2;
}