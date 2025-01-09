function solution(msg) {
  var answer = [];

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
  let idx = 27;
  let i = 0;

  while (i < msg.length) {
    let count = 1;
    let current = msg[i];
    if (i === msg.length - 1) {
      answer.push(dictionary[current]);
      break;
    }
    let next = msg[i + 1];

    while (dictionary[current + next] && i + count < msg.length) {
      current = current + next;
      count++;
      next = msg[i + count];
    }

    if (!dictionary[current + next]) {
      dictionary[current + next] = idx;
    }
    answer.push(dictionary[current]);
    idx++;
    i = i + count;
  }
  return answer;
}