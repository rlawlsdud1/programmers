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
const info = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
let endDay = 0;

if (N === 1) endDay = info[0][1];
info.sort((a, b) => {
  endDay = Math.max(a[1], b[1], endDay);
  if (a[0] === b[0]) return b[1] - b[0] - (a[1] - a[0]);

  return a[0] - b[0];
});

let arrForRecord = Array.from({ length: endDay + 2 }).fill(0);

info.forEach((v) => {
  const [a, b] = v;

  for (let i = a; i <= b; i++) {
    arrForRecord[i]++;
  }
});

arrForRecord = arrForRecord.slice(info[0][0]);

let answer = 0;
let [width, height] = [0, 0];

for (let i = 0; i < arrForRecord.length; i++) {
  const cur = arrForRecord[i];

  height = Math.max(height, cur);
  if (cur) width++;
  else {
    answer += width * height;

    [width, height] = [0, 0];
  }
}

console.log(answer);
