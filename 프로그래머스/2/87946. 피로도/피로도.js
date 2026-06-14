function solution(k, dungeons) {
  let answer = 0;
  const n = dungeons.length;

  function DFS(cur_hp, visited, count) {
    answer = Math.max(answer, count);

    for (let i = 0; i < n; i++) {
      const [required_hp, consumed_hp] = dungeons[i];
      if (!visited.has(i) && cur_hp >= required_hp) {
        visited.add(i);
        DFS(cur_hp - consumed_hp, visited, count + 1);
        visited.delete(i);
      }
    }
  }

  DFS(k, new Set(), 0);

  return answer;
}