function solution(want, number, discount) {
  // 원하는 것과 수량에 대한 정보가 담긴 객체
  const wantAndNumber = {};
  for (let i = 0; i < want.length; i++) {
    wantAndNumber[want[i]] = number[i];
  }
  // n일차부터 10일간의 할인물품에 대한 수량이 담긴 객체를 반환하는 함수
  const discountProdAtNthDay = (discount, n) => {
    const a = {};
    for (let i = n - 1; i < n + 9 && i < discount.length; i++) {
      if (!a[discount[i]]) {
        a[discount[i]] = 1;
      } else {
        a[discount[i]] += 1;
      }
    }
    return a;
  };

  // n일차에 원하는 제품과 수량을 구매할 수 있는지 체크하는 함수
  // 없는 property 때문에 여기서 문제가 생긴듯.
  // NaN과의 비교는 항상 false를 반환한다.
  const canBuyProd = (wantAndNumber, discount, want, n) => {
    const a = discountProdAtNthDay(discount, n);
    for (let i = 0; i < want.length; i++) {
      const product = want[i];
      const requiredQuantity = wantAndNumber[product];
      const availableQuantity = a[product] || 0;

      if (requiredQuantity > availableQuantity) {
        return false;
      }
    }
    return true;
  };

  let count = 0;
  for (let i = 0; i <= discount.length - 10; i++) {
    if (canBuyProd(wantAndNumber, discount, want, i + 1)) {
      count++;
    }
  }

  return count;
}