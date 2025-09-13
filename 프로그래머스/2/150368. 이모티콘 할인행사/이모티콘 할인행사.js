function solution(users, emoticons) {
  const answer = [0, 0]; // [가입자 수, 판매액]
  // 가입자 수부터 비교하고 크면 갱신, 같다면 판매액 기준으로 갱신

  const discountArr = [10, 20, 30, 40];
  const emotionsCnt = emoticons.length;

  function BT(acc) {
    if (acc.length === emotionsCnt) {
      let memberCnt = 0;
      let salesAmount = 0;

      users.forEach((user) => {
        const [discountRate, money] = user;
        let isBuy = false;
        let sum = 0;

        for (let i = 0; i < emotionsCnt; i++) {
          // 일정 비율 이상 할인한다면
          if (discountRate <= discountArr[acc[i]]) {
            sum += ((100 - discountArr[acc[i]]) * emoticons[i]) / 100;
          }

          // 가지고 있는 돈보다 더 커진다면
          if (sum >= money) {
            isBuy = true;
            break;
          }
        }

        if (isBuy) memberCnt++;
        else salesAmount += sum;
      });

      if (memberCnt > answer[0]) {
        answer[0] = memberCnt;
        answer[1] = salesAmount;
      } else if (memberCnt === answer[0]) {
        if (salesAmount > answer[1]) answer[1] = salesAmount;
      }

      return;
    }

    for (let i = 0; i < 4; i++) {
      acc.push(i);
      BT(acc);
      acc.pop();
    }
  }

  BT([]);

  return answer;
}
