function solution(friends, gifts) {
  const fromTo = {};
  for (let i = 0; i < friends.length; i++) {
    fromTo[friends[i]] = Array.from({ length: friends.length }).fill(0);
  }
  function findIndexOfFriend(name) {
    return friends.findIndex((v) => v === name);
  }

  for (let i = 0; i < gifts.length; i++) {
    const [from, to] = gifts[i].split(" ");
    fromTo[from][findIndexOfFriend(to)] += 1;
  }

  function countGiveAndTake(name) {
    const giveAndTake = [0, 0, 0];
    giveAndTake[0] = fromTo[name].reduce((acc, cur) => acc + cur, 0);
    for (let i = 0; i < friends.length; i++) {
      giveAndTake[1] += fromTo[friends[i]][findIndexOfFriend(name)];
    }
    for (let j = 0; j < friends.length; j++) {
      giveAndTake[2] = giveAndTake[0] - giveAndTake[1];
    }
    return giveAndTake;
  }

  const countObj = {};
  for (let i = 0; i < friends.length; i++) {
    countObj[friends[i]] = countGiveAndTake(friends[i]);
  }

  const answer = Array.from({ length: friends.length }).fill(0);

  for (let i = 0; i < friends.length - 1; i++) {
    for (let j = i + 1; j < friends.length; j++) {
      friends[i];
      friends[j];
      if (
        fromTo[friends[i]][findIndexOfFriend(friends[j])] >
        fromTo[friends[j]][findIndexOfFriend(friends[i])]
      ) {
        answer[findIndexOfFriend(friends[i])] += 1;
      } else if (
        fromTo[friends[i]][findIndexOfFriend(friends[j])] <
        fromTo[friends[j]][findIndexOfFriend(friends[i])]
      ) {
        answer[findIndexOfFriend(friends[j])] += 1;
      } else {
        if (countObj[friends[i]][2] > countObj[friends[j]][2]) {
          answer[findIndexOfFriend(friends[i])] += 1;
        } else if (countObj[friends[i]][2] < countObj[friends[j]][2]) {
          answer[findIndexOfFriend(friends[j])] += 1;
        } else {
          // nothing
        }
      }
    }
  }

  return answer.sort((a, b) => b - a)[0];
}