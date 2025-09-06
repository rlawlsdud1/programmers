const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
const input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((v) => v.trim());

const N = Number(input[0]);
const classInfo = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
const M = Number(input[1 + N]);
const studentInfo = input
  .slice(2 + N, 2 + N + M)
  .map((v) => v.split(" ").map(Number));

studentInfo.forEach((v) => {
  let count = 0;
  let subjectNum = 0;

  const curStudentInfoSet = new Set([...v.slice(1, 1 + v[0])]);

  while (subjectNum < N) {
    let isPossible = true;

    const curSubject = classInfo[subjectNum];

    for (let j = 1; j < curSubject.length; j++) {
      if (!curStudentInfoSet.has(curSubject[j])) {
        isPossible = false;
        break;
      }
    }

    if (isPossible) count++;
    subjectNum++;
  }

  console.log(count);
});
