function solution(dartResult) {
  const answer = [];

  for (let i = 0; i < dartResult.length; i++) {
    if (Number.isInteger(Number(dartResult[i]))) {
      if (Number.isInteger(Number(dartResult[i + 1]))) {
        answer.push(10);
        i++;
      } else {
        answer.push(Number(dartResult[i]));
      }
    } else if (["S", "D", "T"].includes(dartResult[i])) {
      if (dartResult[i] === "S") {
        // Nothing
      } else if (dartResult[i] === "D") {
        answer[answer.length - 1] **= 2;
      } else {
        answer[answer.length - 1] **= 3;
      }
    } else if (["*", "#"].includes(dartResult[i])) {
      if (dartResult[i] === "*") {
        if (answer.length >= 2) {
          answer[answer.length - 1] *= 2;
          answer[answer.length - 2] *= 2;
        } else {
          answer[answer.length - 1] *= 2;
        }
      } else {
        answer[answer.length - 1] *= -1;
      }
    }
  }
  return answer.reduce((acc, cur) => acc + cur, 0);
}