const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

const N = Number(input[0].trim());
const string = input[1];
const hashTable = {};
let left = 0,
  answer = 0;

for (let right = 0; right < string.length; right++) {
  if (hashTable[string[right]]) {
    hashTable[string[right]] += 1;
  } else {
    hashTable[string[right]] = 1;
  }

  let count = Object.keys(hashTable).length;
  // count가 N을 넘어가는 순간 window를 줄여줘야 한다.
  while (count > N) {
    if (hashTable[string[left]] === 1) {
      delete hashTable[string[left++]];
    } else {
      hashTable[string[left++]] -= 1;
    }

    count = Object.keys(hashTable).length;
  }

  answer = Math.max(answer, right - left + 1);
}

console.log(answer);
