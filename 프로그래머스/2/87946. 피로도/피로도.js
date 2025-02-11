function solution(k, dungeons) {
  const visited = Array.from({ length: dungeons.length }).fill(false);
  let answer = 0;

  function DFS(hp, count) {
    answer = Math.max(answer, count);

    for (let i = 0; i < dungeons.length; i++) {
      if (!visited[i] && dungeons[i][0] <= hp) {
        visited[i] = true;
        DFS(hp - dungeons[i][1], count + 1);

        visited[i] = false;
      }
    }
  }

  DFS(k, 0);

  return answer;
}