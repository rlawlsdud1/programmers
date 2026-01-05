function solution(players, m, k) {
  let answer = 0;
  const serverInfo = Array.from({ length: 24 }).fill(0);

  players.forEach((p, idx) => {
    const requiredServerCnt = Math.floor(p / m) - serverInfo[idx];

    if (requiredServerCnt > 0) {
      for (let i = idx; i < Math.min(24, idx + k); i++) {
        serverInfo[i] += requiredServerCnt;
      }

      answer += requiredServerCnt;
    }
  });

  return answer;
}
