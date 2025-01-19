function solution(friends, gifts) {
  const giveAndTake = {};
  const giveAndTakeIndividual = Array.from({ length: friends.length }, () =>
    Array.from({ length: friends.length }).fill(0)
  );

  friends.forEach((v) => {
    giveAndTake[v] = [0, 0, 0];
  });
  gifts.forEach((v) => {
    const [from, to] = v.split(" ");
    // giveAndTake는 준선물 받은선물 선물지수를 관리하는 object
    giveAndTake[from][0] += 1;
    giveAndTake[from][2] += 1;
    giveAndTake[to][1] += 1;
    giveAndTake[to][2] -= 1;

    // giveAndTakeIndividual은 개별로 주고받은 것 관리하는 array
    giveAndTakeIndividual[findIdx(friends, from)][findIdx(friends, to)] += 1;
  });
  console.log(giveAndTake);
  console.log(giveAndTakeIndividual);

  const answer = Array.from({ length: friends.length }).fill(0);

  for (let i = 0; i < giveAndTakeIndividual.length - 1; i++) {
    for (let j = i + 1; j < giveAndTakeIndividual.length; j++) {
      if (giveAndTakeIndividual[i][j] > giveAndTakeIndividual[j][i]) {
        answer[i] += 1;
      } else if (giveAndTakeIndividual[i][j] < giveAndTakeIndividual[j][i]) {
        answer[j] += 1;
      } else if (giveAndTakeIndividual[i][j] === giveAndTakeIndividual[j][i]) {
        if (giveAndTake[friends[i]][2] > giveAndTake[friends[j]][2]) {
          answer[i] += 1;
        } else if (giveAndTake[friends[i]][2] < giveAndTake[friends[j]][2]) {
          answer[j] += 1;
        } else {
          // nothing
        }
      }
      // 두개 비교해서 큰 쪽이 다음 달에 하나 받고
      // 같거나 주고받지 않았다면 선물지수로 비교
    }
  }
  return answer.sort((a, b) => b - a)[0];
}
[
  [0, 1, 2],
  [1, 0, 0],
  [2, 0, 0],
];

function findIdx(friends, name) {
  return friends.findIndex((v) => v === name);
}