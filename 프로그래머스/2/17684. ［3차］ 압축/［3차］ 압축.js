function solution(msg) {
  const dictionary = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10,
    K: 11,
    L: 12,
    M: 13,
    N: 14,
    O: 15,
    P: 16,
    Q: 17,
    R: 18,
    S: 19,
    T: 20,
    U: 21,
    V: 22,
    W: 23,
    X: 24,
    Y: 25,
    Z: 26,
  };
  const answer = [];

  let idx = 27; // 사전에 넣을 idx
  let i = 0; // 주어진 문자열의 index를 추적할 i

  while (i < msg.length) {
    if (i === msg.length - 1) {
      answer.push(dictionary[msg[i]]);
      break;
    }
    let current = msg[i];
    let next = msg[i + 1];
    let count = 0;

    while (dictionary[current + next]) {
      count++;
      current = current + next;
      next = msg[i + 1 + count];
    }

    if (!dictionary[current + next]) {
      dictionary[current + next] = idx;
      idx++;
    }

    answer.push(dictionary[current]);

    i = i + 1 + count;
  }
  // console.log(dictionary);

  return answer;
}