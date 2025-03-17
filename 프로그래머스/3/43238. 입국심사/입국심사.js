function solution(n, times) {
  if (n === 1) return 0;
  
  let left = 1,
    right = Math.max(...times) * n;

  let answer;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    let sum = 0;
    times.forEach((v) => {
      sum += Math.floor(mid / v);
    });

    if (sum >= n) {
      // 시간초 줄일 수 있다
      right = mid - 1;
      answer = mid;
    } else {
      // 주어진 시간에 인원 소화를 못하니 시간을 늘려야 한다
      left = mid + 1;
    }
  }
  return answer;
}


// 이분탐색이라고 한다
// 어떻게 이분탐색을 할까
// 이분탐색의 첫 세팅은
// left, right를 어떻게 설정하는지인 것 같다

// 근데 그 전에 왜 이 문제를 이분탐색으로 풀 수 있을까
// naive하게 이 문제를 푼다면
// 1초씩 늘리고, times 배열 각 원소에 대해 몇명 소화할 수 있는지 체크할텐데
// 너무 비효율적이다.
// 최대로 걸리는 값( Math.max(...times) * n )을 right로 두고,
// left는 1로 두자
