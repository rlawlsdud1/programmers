function solution(k, m, score) {
  let answer = 0;
  const boxCount = Math.floor(score.length / m);
  const sortedScore = score.sort((a, b) => b - a);

  const totalBox = [];
  let fruitBox = [];
  for (let i = 0; i < m * boxCount; i++) {
    fruitBox.push(sortedScore[i]);
    if ((i % m) + 1 === m) {
      totalBox.push(fruitBox);
      fruitBox = [];
    }
  }
  console.log(sortedScore);
  console.log(totalBox);
  for (let i = 0; i < totalBox.length; i++) {
    answer = answer + getMinValue(totalBox[i]) * m;
  }

  return answer;
}

function getMinValue(fruitBox) {
  return fruitBox.sort((a, b) => a - b)[0];
}