function solution(progresses, speeds) {
  let remainProgresses = [];
  for (let i = 0; i < progresses.length; i++) {
    const remain = 100 - progresses[i];
    remainProgresses.push(Math.ceil(remain / speeds[i]));
  }

  const answer = [];
  while (remainProgresses.length) {
    let i = remainProgresses.findIndex((e) => e > remainProgresses[0]);
    if (i === -1) {
      i = remainProgresses.length;
    }
    remainProgresses = remainProgresses.slice(i);
    answer.push(i);
  }

  return answer;
}