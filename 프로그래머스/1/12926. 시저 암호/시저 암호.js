function solution(s, n) {
  // 26개
  const lowerCase = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const upperCase = [...lowerCase].map((e) => e.toUpperCase());
  const answerArr = [];
  const splitedS = s.split("");

  splitedS.forEach((e) => {
    if (isBlank(e)) {
      answerArr.push(" ");
    } else if (isUpper(e)) {
      const indexOfE = upperCase.indexOf(e);
      answerArr.push(upperCase[(indexOfE + n) % 26]);
    } else {
      const indexOfE = lowerCase.indexOf(e);
      answerArr.push(lowerCase[(indexOfE + n) % 26]);
    }
  });
  return answerArr.join("");
}

function isUpper(s) {
  return s === s.toUpperCase();
}

function isBlank(s) {
  return s === " ";
}