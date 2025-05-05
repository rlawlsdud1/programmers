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

const [N, d, k, c] = input[0].split(" ").map(Number);
const info = input.slice(1, 1 + N).map(Number);

const doubledInfo = info.concat(info);

function checkTypeCount(info) {
  const keyOfInfo = Object.keys(info);
  let answer = keyOfInfo.length;
  if (!keyOfInfo.includes(String(c))) answer++;

  return answer;
}

// 초기 상태 setup
let answer = 0;
const currentStatus = {};
for (let i = 0; i < k; i++) {
  if (currentStatus[doubledInfo[i]]) {
    currentStatus[doubledInfo[i]] += 1;
  } else {
    currentStatus[doubledInfo[i]] = 1;
  }
}

answer = checkTypeCount(currentStatus);

let start = 0,
  end = k;

while (1) {
  if (start === N) break;

  if (currentStatus[doubledInfo[end]]) {
    currentStatus[doubledInfo[end++]] += 1;
  } else {
    currentStatus[doubledInfo[end++]] = 1;
  }

  if (currentStatus[doubledInfo[start]] === 1) {
    delete currentStatus[doubledInfo[start++]];
  } else {
    currentStatus[doubledInfo[start++]] -= 1;
  }

  answer = Math.max(answer, checkTypeCount(currentStatus));
}

console.log(answer);
