function solution(k, dungeons) {
  const visited = Array.from({ length: dungeons.length }).fill(false);
  let answer = 0;

  function DFS(hp, depth) {
    answer = Math.max(answer, depth);
    for (let i = 0; i < dungeons.length; i++) {
      if (!visited[i] && hp >= dungeons[i][0]) {
        visited[i] = true;
        DFS(hp - dungeons[i][1], depth + 1);
        visited[i] = false;
      }
    }
  }

  DFS(k, 0);

  return answer;
}