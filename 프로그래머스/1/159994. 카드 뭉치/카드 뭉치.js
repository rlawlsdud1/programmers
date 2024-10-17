function solution(cards1, cards2, goal) {
  let newSentence = [];
  goal.forEach((element) => {
    if (element === cards1[0]) {
      newSentence.push(cards1.shift());
    } else if (element === cards2[0]) {
      newSentence.push(cards2.shift());
    } else {
      return "No";
    }
  });
  if (newSentence.length === goal.length) {
    return "Yes";
  } else {
    return "No";
  }
}