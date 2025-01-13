function solution(s) {
  const answer = [];
  s = s.slice(1, s.length - 1) + ",";
  let splitedS = s.split("},");
  splitedS = splitedS
    .slice(0, splitedS.length - 1)
    .sort((a, b) => a.length - b.length);

  for (let i = 0; i < splitedS.length; i++) {
    splitedS[i] = splitedS[i]
      .slice(1)
      .split(",")
      .map((v) => Number(v));
  }

  for (let i = 0; i < splitedS.length; i++) {
    answer.push(splitedS[i][0]);

    for (let j = i + 1; j < splitedS.length; j++) {
      splitedS[j] = splitedS[j].filter((v) => v !== splitedS[i][0]);
    }
  }

  return answer;
}