function solution(s) {
  let answer = 1;

  // 짝수일 때
  for (let i = 0; i < s.length - 1; i++) {
    let left = i;
    let right = i + 1;

    let front = s.slice(left, i + 1);
    let back = s.slice(i + 1, right + 1);

    while (left >= 0 && right < s.length && checkPalindrome(front, back)) {
      answer = Math.max(answer, front.length * 2);

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

    while (left >= 0 && right < s.length && checkPalindrome(front, back)) {
      answer = Math.max(answer, front.length * 2 + 1);

      front = s.slice(--left, i);
      back = s.slice(i + 1, ++right + 1);
    }
  }

  return answer;
}

function checkPalindrome(front, back) {
  back = back.split("").reverse();
  front = front.split("");

  for (let i = 0; i < front.length; i++) {
    if (front[i] !== back[i]) {
      return false;
    }
  }
  return true;
}