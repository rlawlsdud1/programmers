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

let a = BigInt(1),
  b = BigInt(1);

for (let i = BigInt(9 + N); i > N; i--) {
  a *= i;
}
for (let i = BigInt(9); i >= 1; i--) {
  b *= i;
}
console.log(Number((a / b) % BigInt(10007)));
