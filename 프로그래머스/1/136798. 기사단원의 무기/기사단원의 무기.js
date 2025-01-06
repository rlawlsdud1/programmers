function solution(number, limit, power) {
  const divisorCountArr = [];
  for (let i = 1; i <= number; i++) {
    divisorCountArr.push(getDivisorCount(i));
  }

  let answer = 0;
  for (let i = 0; i < divisorCountArr.length; i++) {
    if (divisorCountArr[i] > limit) {
      answer = answer + power;
    } else {
      answer = answer + divisorCountArr[i];
    }
  }
  return answer;
}

function getDivisorCount(number) {
  if (number === 1) {
    return 1;
  }

  let count = 0;
  for (let i = 1; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      count++;
      if (i !== Math.sqrt(number)) {
        count++;
      }
    }
  }
  return count;
}