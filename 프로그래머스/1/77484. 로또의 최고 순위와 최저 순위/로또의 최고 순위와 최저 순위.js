// 1~45 중 6개를 찍어서 맞추는 게임
// 일부 번호를 알아볼 수 없어서 자신이 구매했던 로또의 최고, 최저 순위를 알고 싶어짐
// 알아볼 수 없는 번호를 0으로 표기
// win_nums.length 만큼 반복문 돌리기
// 각 원소가 lottos에 들어있는지 체크. 있다면 +1
// 확정개수를 먼저 구해놓고
// 최댓값은 확정개수 + 0 개수
// 최솟값은 확정개수
// 최댓값, 최솟값 담은 배열을 return 하면 될 것 같다.
// 문제를 똑바로 읽자. .. . 맞은 개수가 아니라 등수를 반환하는 것이다.

function solution(lottos, win_nums) {
  const answer = [];
  const rank = {
    6: 1,
    5: 2,
    4: 3,
    3: 4,
    2: 5,
    1: 6,
    0: 6,
  };
  const zeroCount = lottos.filter((e) => !e).length;
  let minCount = 0;
  win_nums.forEach((e) => {
    lottos.includes(e) && minCount++;
  });
  const maxCount = zeroCount + minCount;
  answer.push(rank[maxCount]);
  answer.push(rank[minCount]);

  return answer;
}