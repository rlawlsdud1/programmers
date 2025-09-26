function solution(n, info) {
  let maxDiff = -Infinity;
  let answer = [];

  function DFS(count, a, r, path, remainArrow) {
    if (count === 11) {
      const temp = [...path];
      temp[10] += remainArrow;

      // 어피치보다 점수가 높아야 answer 후보
      // 또한, 점수 차이가 많이 나야함
      if (a < r) {
        const diff = r - a;
        if (maxDiff === diff) {
          answer.push(temp);
        } else if (maxDiff < diff) {
          maxDiff = diff;
          answer = [temp];
        }
      }

      return;
    }

    // 어피치보다 한발 더 쏘면 점수 먹음. 굳이 두발 이상 쏠 필요가 없음
    if (info[count] + 1 <= remainArrow) {
      path[count] = info[count] + 1;
      DFS(count + 1, a, r + (10 - count), path, remainArrow - info[count] - 1);
      path[count] = 0;
    }

    // 해당 점수 안 쏘는 경우
    if (info[count]) DFS(count + 1, a + (10 - count), r, path, remainArrow);
    else DFS(count + 1, a, r, path, remainArrow);
  }

  const path = Array.from({ length: 11 }).fill(0);

  // parameter : index, 어피치 점수, 라이언 점수, 라이언 점수 배열, 남은 화살
  DFS(0, 0, 0, path, n);

  if (!answer.length) return [-1];

  // toReversed()가 최신 문법이라 지원이 안될 수도 있어서
  answer.sort((a, b) => {
    const aStr = a.slice().reverse().join("");
    const bStr = b.slice().reverse().join("");
    return bStr.localeCompare(aStr);
  });

  return answer[0];
}