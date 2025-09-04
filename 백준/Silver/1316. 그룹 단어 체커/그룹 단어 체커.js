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
const info = input.slice(1, 1 + N);

let answer = 0;

info.forEach((word) => {
  const checkSet = new Set();
  let isGroupWord = true;
  let prev = word[0];
  checkSet.add(prev);

  for (let i = 1; i < word.length; i++) {
    const alphabet = word[i];

    if (prev !== alphabet && checkSet.has(alphabet)) {
      isGroupWord = false;
      break;
    }

    checkSet.add(alphabet);
    prev = alphabet;
  }

  if (isGroupWord) answer++;
});

console.log(answer);
