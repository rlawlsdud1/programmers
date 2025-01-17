function solution(s) {
  let answer = 1;

  // 짝수일 때
  for (let i = 0; i < s.length; i++) {
    let left = i;
    let right = i + 1;

    let front = s.slice(left, i + 1);
    let back = s.slice(i + 1, right + 1);

    while (left >= 0 && right < s.length && checkSymmetry(front, back)) {
      answer = Math.max(answer, 2 * front.length);

      front = s.slice(--left, i + 1);
      back = s.slice(i + 1, ++right + 1);
    }
  }

  // 홀수일 때
  for (let i = 1; i < s.length - 1; i++) {
    let left = i - Math.floor(answer / 2);
    let right = i + Math.floor(answer / 2);

    let front = s.slice(left, i);
    let back = s.slice(i + 1, right + 1);

    while (left >= 0 && right < s.length && checkSymmetry(front, back)) {
      answer = Math.max(answer, 2 * front.length + 1);

      front = s.slice(--left, i);
      back = s.slice(i + 1, ++right + 1);
    }
  }

  return answer;
}

function checkSymmetry(str1, str2) {
  return str1 === str2.split("").reverse().join("");
}