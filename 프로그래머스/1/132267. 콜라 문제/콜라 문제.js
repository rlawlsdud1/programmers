function solution(a, b, n) {
  var answer = 0;
  while (n >= a) {
    if (!n % a) {
      answer += Math.floor(n / a) * b;
      n = Math.floor(n / a) * b;
    } else {
      answer += Math.floor(n / a) * b;
      n = Math.floor(n / a) * b + (n % a);
    }
  }
  return answer;
}