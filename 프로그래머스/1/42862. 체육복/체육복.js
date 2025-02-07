function solution(n, lost, reserve) {
  const lostArr = Array.from({ length: n }).fill(false);
  const reserveArr = Array.from({ length: n }).fill(false);
  lost.forEach((v) => {
    lostArr[v - 1] = true;
  });
  reserve.forEach((v) => {
    if (lostArr[v - 1]) {
      lostArr[v - 1] = false;
      reserveArr[v - 1] = false;
    } else {
      reserveArr[v - 1] = true;
    }
  });
  for (let i = 0; i < n; i++) {
    if (lostArr[i]) {
      if (reserveArr[i - 1]) {
        lostArr[i] = false;
        reserveArr[i - 1] = false;
      } else if (reserveArr[i + 1]) {
        lostArr[i] = false;
        reserveArr[i + 1] = false;
      }
    }
  }

  return lostArr.filter((v) => !v).length;
}