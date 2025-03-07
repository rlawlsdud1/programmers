const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

const [N, K] = input[0].trim().split(" ").map(Number);
const numbers = input[1].split(" ").map(Number);

const hashTable = {};
let left = 0,
  answer = 0;

// 현재 윈도우에 같은 원소는 K개 이하여야 한다
for (right = 0; right < N; right++) {
  hashTable[numbers[right]]
    ? (hashTable[numbers[right]] += 1)
    : (hashTable[numbers[right]] = 1);

  while (hashTable[numbers[right]] > K) {
    hashTable[numbers[left++]] -= 1;
  }

  answer = Math.max(answer, right - left + 1);
}
console.log(answer);
