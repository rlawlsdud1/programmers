// 2 ≤ callings의 길이 ≤ 1,000,000

function solution(players, callings) {
  const playersObj = {};
  players.forEach((player, i) => {
    playersObj[player] = i;
  });
  for (let i = 0; i < callings.length; i++) {
    const calledIdx = playersObj[callings[i]];
    const temp = players[calledIdx - 1];
    players[calledIdx - 1] = callings[i];
    players[calledIdx] = temp;
    playersObj[callings[i]] = calledIdx - 1;
    playersObj[temp] = calledIdx;
  }
  return players;
}