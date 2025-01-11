function getDivisors(number) {
  const divisors = [];
  for (let i = 1; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      divisors.push(i);
      if (number / i !== i) {
        divisors.push(number / i);
      }
    }
  }
  // 정렬하고 1은 제외하고 return
  return divisors.sort((a, b) => a - b).slice(1);
}

function solution(arrayA, arrayB) {
  const commonDivisorsOfA = getDivisors(arrayA[0]);
  const commonDivisorsOfB = getDivisors(arrayB[0]);

  const candidateOfA = [];
  const candidateOfB = [];
  for (let i = 0; i < commonDivisorsOfA.length; i++) {
    if (arrayA.every((v) => v % commonDivisorsOfA[i] === 0)) {
      candidateOfA.push(commonDivisorsOfA[i]);
    }
  }

  for (let i = 0; i < commonDivisorsOfB.length; i++) {
    if (arrayB.every((v) => v % commonDivisorsOfB[i] === 0)) {
      candidateOfB.push(commonDivisorsOfB[i]);
    }
  }

  let maxValue = 0;

  for (let i = 0; i < candidateOfA.length; i++) {
    if (arrayB.every((v) => v % candidateOfA[i] !== 0)) {
      maxValue = Math.max(maxValue, candidateOfA[i]);
    }
  }

  for (let i = 0; i < candidateOfB.length; i++) {
    if (arrayA.every((v) => v % candidateOfB[i] !== 0)) {
      maxValue = Math.max(maxValue, candidateOfB[i]);
    }
  }

  return maxValue;
}