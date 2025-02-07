function solution(answers) {
  const first = [1, 2, 3, 4, 5];
  const second = [2, 1, 2, 3, 2, 4, 2, 5];
  const third = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let scoreObj = { 1: 0, 2: 0, 3: 0 };
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === first[i % first.length]) scoreObj[1] += 1;
    if (answers[i] === second[i % second.length]) scoreObj[2] += 1;
    if (answers[i] === third[i % third.length]) scoreObj[3] += 1;
  }
  const scoreInfo = Object.entries(scoreObj);
  scoreInfo.sort((a, b) => b[1] - a[1]);
  const answer = [];
  scoreInfo
    .filter((v) => v[1] === scoreInfo[0][1])
    .forEach((v) => {
      answer.push(v[0]);
    });
  answer.sort((a, b) => a - b);
  return answer.map(Number);
}