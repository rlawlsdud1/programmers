function solution(numbers, hand) {
  const keyPad = {
    1: [1, 1],
    2: [2, 1],
    3: [3, 1],
    4: [1, 2],
    5: [2, 2],
    6: [3, 2],
    7: [1, 3],
    8: [2, 3],
    9: [3, 3],
    "*": [1, 4],
    0: [2, 4],
    "#": [3, 4],
  };
  let answer = "";
  let curL = "*",
    curR = "#";
  numbers.forEach((num) => {
    if (num === 1 || num === 4 || num === 7) {
      answer += "L";
      curL = num;
    } else if (num === 3 || num === 6 || num === 9) {
      answer += " R";
      curR = num;
    } else {
      if (
        Math.abs(keyPad[num][0] - keyPad[curL][0]) +
          Math.abs(keyPad[num][1] - keyPad[curL][1]) >
        Math.abs(keyPad[num][0] - keyPad[curR][0]) +
          Math.abs(keyPad[num][1] - keyPad[curR][1])
      ) {
        answer += "R";
        curR = num;
      } else if (
        Math.abs(keyPad[num][0] - keyPad[curL][0]) +
          Math.abs(keyPad[num][1] - keyPad[curL][1]) <
        Math.abs(keyPad[num][0] - keyPad[curR][0]) +
          Math.abs(keyPad[num][1] - keyPad[curR][1])
      ) {
        answer += "L";
        curL = num;
      } else {
        if (hand === "right") {
          answer += "R";
          curR = num;
        } else {
          answer += "L";
          curL = num;
        }
      }
    }
  });

  return answer
    .split("")
    .filter((e) => e !== " ")
    .join("");
}