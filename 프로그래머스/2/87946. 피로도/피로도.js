function solution(k, dungeons) {
  let answer = 0;
  const visited = new Array(dungeons.length).fill(false);

  function dfs(currentHp, round) {
    answer = Math.max(round, answer);

    for (let i = 0; i < dungeons.length; i++) {
      if (!visited[i] && dungeons[i][0] <= currentHp) {
        visited[i] = true;
        dfs(currentHp - dungeons[i][1], round + 1);
        visited[i] = false;
      }
    }
  }

  dfs(k, 0);

  return answer;
}