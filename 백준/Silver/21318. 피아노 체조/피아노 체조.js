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
const info = input[1].split(" ").map(Number);
const Q = Number(input[2]);
const questions = input.slice(3, 3 + Q).map((v) => v.split(" ").map(Number));

const mistakeArr = Array.from({ length: N }).fill(0);
for (let i = 0; i < N - 1; i++) {
  if (info[i] > info[i + 1]) mistakeArr[i] = 1;
}
const prefix = Array.from({ length: N }).fill(0);
for (let i = 1; i < N; i++) {
  prefix[i] += prefix[i - 1] + mistakeArr[i - 1];
}
const result = [];
questions.forEach((v) => {
  const [a, b] = v;
  result.push(prefix[b - 1] - prefix[a - 1]);
});
console.log(result.join("\n"));
