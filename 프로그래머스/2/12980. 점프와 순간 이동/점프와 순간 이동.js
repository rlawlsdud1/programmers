function solution(n) {
  var ans = 0;
  while (n > 0) {
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = (n - 1) / 2;
      ans++;
    }
  }
  return ans;
}