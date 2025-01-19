function solution(babbling) {
  let answer = 0;
  for (let i = 0; i < babbling.length; i++) {
    if (checkPossible(babbling[i])) {
      answer++;
    }
  }
  return answer;
}

console.log(solution(["aya", "yee", "u", "maa"]));

function checkPossible(str) {
  let temp = "";
  while (str.length) {
    if (str.startsWith("aya") && str.slice(0, 3) !== temp) {
      str = str.slice(3);
      temp = "aya";
    } else if (str.startsWith("ye") && str.slice(0, 2) !== temp) {
      str = str.slice(2);
      temp = "ye";
    } else if (str.startsWith("woo") && str.slice(0, 3) !== temp) {
      str = str.slice(3);
      temp = "woo";
    } else if (str.startsWith("ma") && str.slice(0, 2) !== temp) {
      str = str.slice(2);
      temp = "ma";
    } else {
      return false;
    }
  }
  return true;
}