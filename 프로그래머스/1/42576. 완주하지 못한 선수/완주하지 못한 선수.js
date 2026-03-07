function solution(participant, completion) {
  const hashTable = {};

  completion.forEach((v) => {
    hashTable[v] ? (hashTable[v] += 1) : (hashTable[v] = 1)
  });

  for (const player of participant) {
    if (!hashTable[player]) return player;

    hashTable[player] -= 1
  }
}