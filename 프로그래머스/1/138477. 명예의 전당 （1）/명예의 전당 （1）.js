function solution(k, score) {
  var answer = [];
  let honor = [];
  for (let i = 0; i < score.length; i++) {
    if (honor.length < k) {
      honor.push(score[i]);
      honor.sort((a, b) => a - b);
      answer.push(honor[0]);
    } else {
      honor.sort((a, b) => a - b);
      if (honor[0] < score[i]) {
        honor.shift();
        honor.push(score[i]);
        honor.sort((a, b) => a - b);
        answer.push(honor[0]);
      } else {
        answer.push(honor[0]);
      }
    }
  }
  return answer;
}