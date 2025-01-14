function solution(k, dungeons) {
  let answer = 0;
  const visited = Array.from({ length: dungeons.length }).fill(false);

  function dfs(hp, round) {
    answer = Math.max(answer, round);
    for (let i = 0; i < dungeons.length; i++) {
      if (!visited[i] && dungeons[i][0] <= hp) {
        visited[i] = true;
        dfs(hp - dungeons[i][1], round + 1);
        visited[i] = false;
      }
    }
  }

  dfs(k, 0);

  return answer;
}