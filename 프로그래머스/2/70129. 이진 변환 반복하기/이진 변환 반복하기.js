function solution(s) {
  var answer = [];
  let deletedArr = s.split("");
  let count = 0;
  let deletedZero = 0;
  while (deletedArr.length > 1) {
    let deletedLength = deletedArr.filter((e) => e !== "0").length;
    deletedZero += deletedArr.length - deletedLength;
    deletedArr = deletedArr.filter((e) => e !== "0");

    deletedArr = deletedLength.toString(2).split("");
    count++;
  }
  answer.push(count);
  answer.push(deletedZero);

  return answer;
}