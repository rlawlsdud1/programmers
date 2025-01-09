function solution(players, callings) {
  const playersObj = {};
  for (let i = 0; i < players.length; i++) {
    playersObj[players[i]] = i;
  }

  for (let i = 0; i < callings.length; i++) {
    const idx = playersObj[callings[i]];
    const temp = players[idx - 1];
    playersObj[temp] = playersObj[temp] + 1;
    playersObj[callings[i]] = playersObj[callings[i]] - 1;

    players[idx - 1] = callings[i];
    players[idx] = temp;
  }
  return players;
}
