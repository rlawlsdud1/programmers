function solution(N, stages) {
  const failureRate = [];
  let remainingPerson = stages.length;
  for (let i = 1; i <= N; i++) {
    // 파이썬에선 count 쓰면 됐는데 ..
    const count = stages.filter((e) => e === i).length;
    failureRate.push([i, count / remainingPerson]);
    remainingPerson = remainingPerson - count;
  }

  // 각 원소의 두번째 원소를 기준으로 내림차순 정렬
  // 같다면 각 원소의 첫번째 원소를 기준으로 오름차순 정렬
  const sortedFailureRate = failureRate.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return b[1] - a[1];
  });

  const answer = [];
  for (let i = 0; i < N; i++) {
    answer.push(sortedFailureRate[i][0]);
  }

  return answer;
}