function solution(name, yearning, photo) {
  var answer = [];

  for (let j = 0; j < photo.length; j++) {
    let score = 0;
    for (let k = 0; k < photo[j].length; k++) {
      if (name.includes(photo[j][k])) {
        score += yearning[name.indexOf(photo[j][k])];
      }
    }
    answer.push(score);
  }

  return answer;
}