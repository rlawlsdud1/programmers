function solution(k, dungeons) {
  let answer = 0;

  const n = dungeons.length;
  const visited = new Set();

  function DFS(cur_hp, visited) {
    answer = Math.max(answer, visited.size);

    for (let i = 0; i < n; i++) {
      const [required_hp, cost] = dungeons[i];
      if (!visited.has(i) && cur_hp >= required_hp) {
        visited.add(i);
        DFS(cur_hp - cost, visited);
        visited.delete(i);
      }
    }
  }

  DFS(k, visited);

  return answer;
}