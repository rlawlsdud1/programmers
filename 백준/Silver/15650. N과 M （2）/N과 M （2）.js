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

const [N, M] = input[0].split(" ").map(Number);

function BT(arr, start) {
  if (arr.length === M) {
    console.log(arr.join(" "));
    return;
  }

  for (let i = start; i <= N; i++) {
    arr.push(i);
    BT(arr, i + 1);
    arr.pop();
  }
}

BT([], 1);
