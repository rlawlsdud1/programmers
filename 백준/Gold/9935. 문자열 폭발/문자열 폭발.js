const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((v) => v.trim());

const givenStr = input[0];
const explosionStr = input[1];

const stack = [];
const explosionStrLength = explosionStr.length;
for (let i = 0; i < givenStr.length; i++) {
  stack.push(givenStr[i]);
  if (stack.slice(-explosionStrLength).join("") === explosionStr) {
    for (let i = 0; i < explosionStrLength; i++) {
      stack.pop();
    }
  }
}

if (!stack.length) console.log("FRULA");
else console.log(stack.join(""));
