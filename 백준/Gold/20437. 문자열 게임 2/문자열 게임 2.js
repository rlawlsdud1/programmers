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

const T = Number(input[0]);
const info = input.slice(1, 2 * T + 1);

// 3. 어떤 문자를 정확히 K개를 포함하는 가장 짧은 연속 문자열의 길이를 구한다.
// 4. 어떤 문자를 정확히 K개를 포함하고, 문자열의 첫 번째와 마지막 글자가
//    해당 문자로 같은 가장 긴 연속 문자열의 길이를 구한다.

// 3, 4번에서 구한 연속 문자열의 길이를 공백을 사이에 두고 출력한다
// 만약 만족하는 연속 문자열이 없을 시 -1을 출력한다.

let idx = 0;
for (let i = 0; i < T; i++) {
  const W = info[idx++];
  const K = Number(info[idx++]);

  const countObj = {};
  for (let j = 0; j < W.length; j++) {
    countObj[W[j]] ? countObj[W[j]].push(j) : (countObj[W[j]] = [j]);
  }

  const keys = Object.keys(countObj);
  let answerOne = Infinity;
  let answerTwo = 0;
  keys.forEach((v) => {
    const idxForKeys = countObj[v];

    for (let j = 0; j <= idxForKeys.length - K; j++) {
      answerOne = Math.min(
        answerOne,
        idxForKeys[j + K - 1] - idxForKeys[j] + 1
      );
      answerTwo = Math.max(
        answerTwo,
        idxForKeys[j + K - 1] - idxForKeys[j] + 1
      );
    }
  });
  if (answerOne === Infinity) console.log(-1);
  else console.log(answerOne, answerTwo);
}
