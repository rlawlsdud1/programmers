function solution(n, k) {
  const convertedN = n.toString(k);
  const splitedTarget = convertedN.split("0");
  let answer = 0;

  splitedTarget.forEach((v) => {
    const num = Number(v);

    if (checkPrime(num)) answer++;
  });

  return answer;
}

function checkPrime(num) {
  if (num === 1 || num === 0) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }

  return true;
}