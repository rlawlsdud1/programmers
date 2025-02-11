function solution(k, dungeons) {
  const visited = Array.from({ length: dungeons.length }).fill(false);
  let answer = 0;

  function DFS(hp) {
    for (let i = 0; i < dungeons.length; i++) {
      if (!visited[i] && dungeons[i][0] <= hp) {
        visited[i] = true;
        DFS(hp - dungeons[i][1]);

        visited[i] = false;
      }
    }
    answer = Math.max(answer, visited.filter((v) => v === true).length);
  }

  DFS(k);

  return answer;
}