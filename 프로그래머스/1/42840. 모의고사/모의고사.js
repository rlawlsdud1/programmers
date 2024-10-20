function solution(answers) {
  const answersLength = answers.length;
  let first = [1, 2, 3, 4, 5];
  let second = [2, 1, 2, 3, 2, 4, 2, 5];
  let third = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let firstCount = 0;
  let secondCount = 0;
  let thirdCount = 0;
  for (let i = 0; i < answersLength; i++) {
    if (answers[i] === first[i % 5]) {
      firstCount++;
    }
    if (answers[i] === second[i % 8]) {
      secondCount++;
    }
    if (answers[i] === third[i % 10]) {
      thirdCount++;
    }
  }

  const countArr = [
    [1, firstCount],
    [2, secondCount],
    [3, thirdCount],
  ].sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return b[1] - a[1];
  });
  // 비교 로직 작성 후 결과 return
  if (countArr[0][1] > countArr[1][1]) {
    return [countArr[0][0]];
  } else if (
    countArr[0][1] === countArr[1][1] &&
    countArr[1][1] > countArr[2][1]
  ) {
    return [countArr[0][0], countArr[1][0]];
  } else {
    return [countArr[0][0], countArr[1][0], countArr[2][0]];
  }
}