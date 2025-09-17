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

let idx = 0;

while (1) {
  if (input[idx] === "0") break;

  const m = Number(input[idx++]);
  const sentence = input[idx++];

  let left = 0,
    right = 1;

  const charObj = {};

  // initial setting
  charObj[sentence[0]] = 1;
  let count = 1; // 몇 개의 문자를 사용하고 있는지
  let answer = 1;

  while (right < sentence.length) {
    if (charObj[sentence[right]]) {
      charObj[sentence[right++]]++;
    } else {
      charObj[sentence[right++]] = 1;
      count++;
    }

    while (count > m) {
      charObj[sentence[left]]--;

      if (charObj[sentence[left]] === 0) {
        delete charObj[sentence[left]];
        count--;
      }

      left++;
    }

    answer = Math.max(answer, right - left);
  }

  console.log(answer);
}
