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
const info = input.slice(1);
for (let i = 0; i < T; i++) {
  const N = Number(info[i]);
  BT(1, "1", N);
  if (i === T - 1) break;
  console.log();
}

function BT(numberCnt, path, N) {
  if (numberCnt === N) {
    if (calculatePath(path) === 0) {
      console.log(path);
    }
    return;
  }

  BT(numberCnt + 1, `${path} ${numberCnt + 1}`, N);
  BT(numberCnt + 1, `${path}+${numberCnt + 1}`, N);
  BT(numberCnt + 1, `${path}-${numberCnt + 1}`, N);
}

function calculatePath(path) {
  let sum = 0;
  let currentNum = "";
  let operator = "+";

  for (let i = 0; i < path.length; i++) {
    let char = path[i];

    if (char === " ") {
      continue;
    } else if (char === "+" || char === "-") {
      if (currentNum !== "") {
        sum =
          operator === "+"
            ? sum + parseInt(currentNum)
            : sum - parseInt(currentNum);
      }

      operator = char;
      currentNum = "";
    } else {
      currentNum += char;
    }
  }

  if (currentNum !== "") {
    sum =
      operator === "+"
        ? sum + parseInt(currentNum)
        : sum - parseInt(currentNum);
  }

  return sum;
}
