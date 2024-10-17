// 3명의 정수 번호를 더했을 때 0이 되면 삼총사
// 삼총사를 만들 수 있는 방법의 수를 return
// numbers의 길이는 3 이상 13이하이므로 for문 세개 중첩해도 괜찮지 않을까
function solution(number) {
  var answer = 0;
  for (let i = 0; i < number.length; i++) {
    for (let j = i + 1; j < number.length; j++) {
      for (let k = j + 1; k < number.length; k++) {
        if (number[i] + number[j] + number[k] === 0) {
          answer++;
        }
      }
    }
  }
  return answer;
}