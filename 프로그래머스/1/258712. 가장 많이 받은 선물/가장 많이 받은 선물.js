function solution(friends, gifts) {
  const nameToIdx = {};
  friends.forEach((name, idx) => {
    nameToIdx[name] = idx;
  });
  const cntOfFriends = friends.length;
  const giftInfo = Array.from({ length: cntOfFriends }, () =>
    Array.from({ length: cntOfFriends }).fill(0)
  );

  gifts.forEach((v) => {
    const [from, to] = v.split(" ");
    giftInfo[nameToIdx[from]][nameToIdx[to]] += 1;
  });

  const giftPoints = Array.from({ length: cntOfFriends }, () => [0, 0]);

  for (let i = 0; i < cntOfFriends; i++) {
    giftPoints[i][0] += giftInfo[i].reduce((acc, cur) => acc + cur, 0);
  }

  for (let j = 0; j < cntOfFriends; j++) {
    for (let i = 0; i < cntOfFriends; i++) {
      giftPoints[j][1] += giftInfo[i][j];
    }
  }

  for (let i = 0; i < cntOfFriends; i++) {
    giftPoints[i] = giftPoints[i][0] - giftPoints[i][1];
  }

  const answerArr = Array.from({ length: cntOfFriends }).fill(0);
  for (let i = 0; i < cntOfFriends; i++) {
    for (let j = i + 1; j < cntOfFriends; j++) {
      const a = giftInfo[i][j];
      const b = giftInfo[j][i];
      if ((a > 0 || b > 0) && a !== b) {
        if (a > b) answerArr[i] += 1;
        else if (a < b) answerArr[j] += 1;
      } else {
        const pointOfA = giftPoints[i];
        const pointOfB = giftPoints[j];

        if (pointOfA > pointOfB) answerArr[i] += 1;
        else if (pointOfA < pointOfB) answerArr[j] += 1;
      }
    }
  }

  return Math.max(...answerArr);
}