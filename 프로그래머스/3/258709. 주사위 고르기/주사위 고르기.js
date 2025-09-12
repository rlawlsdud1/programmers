function solution(dice) {
  dice = dice.map((v) => {
    return v.sort((a, b) => a - b);
  });

  const n = dice.length;
  let maxCnt = -Infinity;
  let answer;

  function BT(combi, start) {
    if (combi.size === n / 2) {
      const oppoSet = [];

      for (let i = 0; i < n; i++) {
        if (!combi.has(i)) {
          oppoSet.push(i);
        }
      }

      // A가 고른 주사위의 합 모든 경우의 수 구하기
      const resultOfA = [];
      getEveryCase([...combi], n / 2, resultOfA, 0, 0, dice);

      // B가 고른 주사위의 합 모든 경우의 수 구하기
      const resultOfB = [];
      getEveryCase(oppoSet, n / 2, resultOfB, 0, 0, dice);
      resultOfB.sort((a, b) => a - b);

      let count = 0;
      resultOfA.forEach((v) => {
        count += binarySearch(v, resultOfB);
      });

      if (count > maxCnt) {
        maxCnt = count;
        answer = [...combi].map((v) => v + 1);
      }

      return;
    }

    for (let i = start; i < n; i++) {
      combi.add(i);
      BT(combi, i + 1);
      combi.delete(i);
    }
  }

  BT(new Set(), 0);

  return answer;
}

function binarySearch(target, arr) {
  let left = 0,
    right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

function getEveryCase(candidate, n, result, calculateResult, count, dice) {
  if (count === n) {
    result.push(calculateResult);
    return;
  }

  for (let i = 0; i < 6; i++) {
    calculateResult += dice[candidate[count]][i];
    getEveryCase(candidate, n, result, calculateResult, count + 1, dice);
    calculateResult -= dice[candidate[count]][i];
  }
}