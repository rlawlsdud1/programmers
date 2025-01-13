function solution(elements) {
  const len = elements.length;
  const setOfSum = new Set();
  for (let i = 1; i <= len; i++) {
    for (let j = 0; j < len; j++) {
      if (i + j >= len) {
        const subsequence = elements
          .slice(j)
          .concat(elements.slice(0, (j + i) % len));

        setOfSum.add(getSumOfArr(subsequence));
      } else {
        const subsequence = elements.slice(j, (j + i) % len);
        setOfSum.add(getSumOfArr(subsequence));
      }
    }
  }
  return setOfSum.size;
}

function getSumOfArr(array) {
  return array.reduce((arr, cur) => arr + cur, 0);
}