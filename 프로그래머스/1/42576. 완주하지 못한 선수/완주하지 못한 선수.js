function solution(participant, completion) {
  const participantObj = {};
  participant.forEach((v) => {
    participantObj[v] ? (participantObj[v] += 1) : (participantObj[v] = 1);
  });

  const completionObj = {};
  completion.forEach((v) => {
    completionObj[v] ? (completionObj[v] += 1) : (completionObj[v] = 1);
  });

  const player = Object.keys(participantObj);
  for (let i = 0; i < player.length; i++) {
    const name = player[i];
    if (!completionObj[name] || completionObj[name] !== participantObj[name]) {
      return name;
    }
  }
}