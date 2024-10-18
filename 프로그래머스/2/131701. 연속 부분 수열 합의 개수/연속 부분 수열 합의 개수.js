function solution(elements) {
  const sumArr = [];
  for (let i = 1; i <= elements.length; i++) {
    for (let j = 0; j < elements.length; j++) {
      if (elements.length < j + i) {
        let sum = 0;
        elements
          .slice(j, j + i)
          .concat(elements.slice(0, i + j - elements.length))
          .forEach((e) => {
            sum += e;
          });
        sumArr.push(sum);
      } else {
        let sum = 0;
        elements.slice(j, j + i).forEach((e) => {
          sum += e;
        });
        sumArr.push(sum);
      }
    }
  }
  return new Set(sumArr).size;
}