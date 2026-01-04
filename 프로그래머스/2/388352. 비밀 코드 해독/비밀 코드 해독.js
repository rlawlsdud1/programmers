function solution(n, q, ans) {
  let answer = 0;

  function getCombi(combi, prev) {
    if (combi.length === 5) {
      let isPossible = true;

      for (let i = 0; i < q.length; i++) {
        const cur = q[i];

        const count = cur.filter((v) => combi.includes(v)).length;
        if (count !== ans[i]) {
          isPossible = false;
          break;
        }
      }

      if (isPossible) answer++;
      return;
    }

    for (let i = prev + 1; i <= n; i++) {
      // 조건에 걸리지 않으면 combi에 5개가 채워질 수 없음
      if (combi.length + n - i + 1 >= 5) {
        combi.push(i);
        getCombi(combi, i);
        combi.pop();
      }
    }
  }

  for (let i = 1; i <= n - 4; i++) {
    getCombi([i], i);
  }

  return answer;
}