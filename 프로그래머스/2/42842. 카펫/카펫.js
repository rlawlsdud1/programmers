
function solution(brown, yellow) {
  const answer = [];
  const totalCandidate = [];
  let sumOfCarpet = brown + yellow;
  for (let i = 3; i <= Math.ceil(sumOfCarpet / 3); i++) {
    if (sumOfCarpet % i === 0 && sumOfCarpet / i >= i) {
      totalCandidate.push([sumOfCarpet / i, i]);
    }
  }

  const yellowCandidate = [];
  for (let i = 1; i <= yellow; i++) {
    if (yellow % i === 0 && yellow / i >= i) {
      yellowCandidate.push([yellow / i, i]);
    }
  }

  for (let i = 0; i < totalCandidate.length; i++) {
    for (let j = 0; j < yellowCandidate.length; j++) {
      if (
        yellowCandidate[j][0] + 2 == totalCandidate[i][0] &&
        yellowCandidate[j][1] + 2 == totalCandidate[i][1]
      ) {
        answer.push(Math.max(...totalCandidate[i]));
        answer.push(Math.min(...totalCandidate[i]));
      }
    }
  }
  // console.log(yellowCandidate);
  // console.log(totalCandidate);

  return answer;
}
