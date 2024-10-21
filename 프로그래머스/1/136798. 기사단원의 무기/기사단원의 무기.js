function solution(number, limit, power) {
  // 약수의 개수를 세고, 약수의 개수가 제한수치를 넘으면 정한 공격력 return하는 함수
  function countDivisor(a) {
    let count = 0;
    for (let i = 1; i <= Math.sqrt(a); i++) {
      if (a % i === 0) {
        count++;
        if (i !== a / i) {
          count++;
        }
      }
      if (count > limit) {
        return power;
      }
    }
    return count;
  }

  const attack = [];
  for (let i = 1; i <= number; i++) {
    attack.push(countDivisor(i));
  }

  return attack.reduce((total, e) => total + e, 0);
}