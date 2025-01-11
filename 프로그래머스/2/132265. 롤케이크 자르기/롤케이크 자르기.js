function solution(topping) {
  let answer = 0;
  let brotherObj = {};
  for (let i = 0; i < topping.length; i++) {
    if (!brotherObj[topping[i]]) {
      brotherObj[topping[i]] = 1;
    } else {
      brotherObj[topping[i]] = brotherObj[topping[i]] + 1;
    }
  }

  let brother = new Set(topping).size;
  let youngerBrother = [];
  let youngerBroCount = 0;
  for (let i = topping.length - 1; i >= 0; i--) {
    if (brotherObj[topping[i]]) {
      if (brotherObj[topping[i]] === 1) {
        delete brotherObj[topping[i]];
        brother--;
      } else {
        brotherObj[topping[i]] = brotherObj[topping[i]] - 1;
      }
    }
    if (!youngerBrother.includes(topping[i])) {
      youngerBrother.push(topping[i]);
      youngerBroCount++;
    }

    if (brother === youngerBroCount) {
      answer++;
    }
  }

  return answer;
}