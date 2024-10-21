function solution(s, skip, index) {
  // 26개
  const alphabet = [
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
  // 문자열 s의 각 알파벳을 index만큼 뒤의 알파벳으로 바꿔준다
  // index만큼의 뒤의 알파벳이 z를 넘어갈 경우 다시 a로 돌아간다
  // skip 에 있는 알파벳은 제외하고 건너뛴다.
  let answer = "";
  const filterdAlpha = alphabet.filter((e) => !skip.split("").includes(e));
  const filteredAlphaLength = filterdAlpha.length;
  const sToArr = s.split("");
  sToArr.forEach((e) => {
    answer +=
      filterdAlpha[
        (filterdAlpha.findIndex((a) => a === e) + index) % filteredAlphaLength
      ];
  });

  return answer;
}