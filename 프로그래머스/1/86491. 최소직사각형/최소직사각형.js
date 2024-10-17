// 가장 긴 가로길이 x 가장 긴 세로길이 크기로 만들면 모든 명함들을 수납 가능
// 모든 명함을 수납할 수 있는 가장 작은 지갑 만들기
// 가장 긴 가로길이 x 가장 긴 세로길이 로 만들면 모든 명함들을 수납 가능하지만
// 꼭 이럴 필요는 없다
// idea ?
// sizes 배열에 있는 각 원소를 크기 순으로 정렬한다.
// 정렬된 배열에서 가장 긴 가로길이 x 가장 긴 세로 길이로 하면 모든 명함을 수납 가능하다.

function solution(sizes) {
  let size_x = [];
  let size_y = [];
  sizes.forEach((element) => {
    element.sort((a, b) => a - b);
  });
  sizes.forEach((element) => {
    size_x.push(element[0]);
    size_y.push(element[1]);
  });
  size_x.sort((a, b) => b - a);
  size_y.sort((a, b) => b - a);

  return size_x[0] * size_y[0];
}