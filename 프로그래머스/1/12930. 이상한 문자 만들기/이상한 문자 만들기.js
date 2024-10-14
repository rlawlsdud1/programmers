// 기분 전환용 문풀

// 하나 이상의 공백문자로 구분되어 있다.
// 각 단어의 짝수번째 알파벳은 대문자로, 홀수번째 알파벳은 소문자로 바꾼 문자열을 return
// 0번째 인덱스는 짝수처리

function solution(s) {
  var answerArr = [];
  const sToArr = s.split(" ");
  sToArr.forEach((element) => {
    answerArr.push(evenToCap(element));
  });
  return answerArr.join(" ");
}

function evenToCap(s) {
  let str = "";
  for (let i = 0; i < s.length; i++) {
    if (i % 2 === 0) {
      str += s[i].toUpperCase();
    } else {
      str += s[i].toLowerCase();
    }
  }
  return str;
}