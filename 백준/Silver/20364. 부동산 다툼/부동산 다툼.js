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

const [N, Q] = input[0].split(" ").map(Number);
const info = input.slice(1, 1 + Q).map(Number);
const visited = new Set();
const result = [];

for (const duck of info) {
  let current = duck;
  let firstBlocked = 0;

  while (current >= 1) {
    if (visited.has(current)) {
      firstBlocked = current;
    }
    current = Math.floor(current / 2);
  }

  if (firstBlocked === 0) {
    visited.add(duck); // 성공
    result.push(0);
  } else {
    result.push(firstBlocked);
  }
}

console.log(result.join("\n"));
