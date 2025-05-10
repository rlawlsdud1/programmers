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

const [N, P, Q] = input[0].split(" ").map(Number);
// Ai = A⌊i/P⌋ + A⌊i/Q⌋ (i ≥ 1)
// ⌊x⌋는 x를 넘지 않는 가장 큰 정수이다.

const sequenceMap = new Map();
sequenceMap.set(0, 1);

function getTarget(number) {
  if (number === 0) return 1;
  if (sequenceMap.has(number)) return sequenceMap.get(number);

  const B = getTarget(Math.floor(number / P));
  const C = getTarget(Math.floor(number / Q));

  sequenceMap.set(number, B + C);

  return B + C;
}
getTarget(N);
console.log(sequenceMap.get(N));
