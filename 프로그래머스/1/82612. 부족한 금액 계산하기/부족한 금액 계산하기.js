function solution(price, money, count) {
  let totalPrice = 0;
  for (let i = 1; i <= count; i++) {
    totalPrice += i * price;
  }
  if (totalPrice - money <= 0) {
    return 0;
  }
  return totalPrice - money;
}