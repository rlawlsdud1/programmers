// 입력으로 지도의 한변 크기와 2개의 정수배열
// 10진법 -> 2진법 으로 바꾼 뒤 5자리 수 맞춰주기
// 두개를 겹쳐서 둘 다 0이면 0, 아니면 1
// 0은 공백, 1은 # 으로 변환

function solution(n, arr1, arr2) {
  var answer = [];
  for (let i = 0; i < n; i++) {
    arr1[i] = arr1[i].toString(2);
    if (arr1[i].toString(2).length !== n) {
      const deficientNumber = n - arr1[i].toString(2).length;
      for (let j = 0; j < deficientNumber; j++) {
        arr1[i] = "0" + arr1[i];
      }
    }
    arr2[i] = arr2[i].toString(2);
    if (arr2[i].toString(2).length !== n) {
      const deficientNumber = n - arr2[i].toString(2).length;
      for (let j = 0; j < deficientNumber; j++) {
        arr2[i] = "0" + arr2[i];
      }
    }
  }

  for (let i = 0; i < n; i++) {
    let iThNum = "";
    for (let j = 0; j < n; j++) {
      if (arr1[i][j] == 0 && arr2[i][j] == 0) {
        iThNum = iThNum + " ";
      } else {
        iThNum = iThNum + "#";
      }
    }
    answer.push(iThNum);
  }
  console.log(arr1);
  console.log(arr2);
  return answer;
}