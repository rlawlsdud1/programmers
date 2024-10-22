function solution(keymap, targets) {
  const result = [];
  targets.forEach((target) => {
    let answer = 0;

    for (let i = 0; i < target.length; i++) {
      if (findMinCount(keymap, target[i]) !== -1) {
        answer += findMinCount(keymap, target[i]);
      } else {
        answer = -1;
        break;
      }
    }

    result.push(answer);
  });
  return result;
}

function findMinCount(keyMap, targetAlphabet) {
  const targetIdxArr = [];
  keyMap.forEach((key) => {
    const splitedArr = key.split("");
    const targetIdx = splitedArr.findIndex((e) => e === targetAlphabet);
    if (targetIdx !== -1) {
      targetIdxArr.push(targetIdx);
    }
  });
  if (!targetIdxArr.length) {
    return -1;
  }

  return Math.min(...targetIdxArr) + 1;
}