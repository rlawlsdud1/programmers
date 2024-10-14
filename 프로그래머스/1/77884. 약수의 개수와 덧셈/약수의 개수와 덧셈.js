function solution(left, right) {
  var answer = 0;
  for (let n = left; n <= right; n++) {
    if (countDivisor(n) % 2) {
      answer -= n;
    } else {
      answer += n;
    }
  }
  return answer;
}

function countDivisor(num) {
  if (num === 1) {
    return 1;
  }
  let count = 2;
  for (let n = 2; n < num; n++) {
    if (!(num % n)) {
      count++;
    }
  }

  return count;
}