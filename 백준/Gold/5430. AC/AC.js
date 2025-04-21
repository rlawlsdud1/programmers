const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let T = Number(input[0]);
let idx = 1;

for (let i = 0; i < T; i++) {
  const p = input[idx++].trim().split("");
  const n = Number(input[idx++]);
  let testArr = input[idx++].trim().slice(1, -1).split(",");

  const countOfD = p.filter((v) => v === "D").length;
  if (countOfD > n) {
    console.log("error");
    continue;
  }

  let isReverse = false;
  let left = 0;
  let right = n;

  for (const operation of p) {
    if (operation === "R") {
      isReverse = !isReverse;
    } else {
      if (isReverse) {
        right--;
      } else {
        left++;
      }
    }
  }
  if (isReverse) {
    testArr = testArr.slice(left, right).reverse().join(",");
  } else {
    testArr = testArr.slice(left, right).join(",");
  }
  console.log("[" + testArr + "]");
}
