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

const n = Number(input[0]);
const info = input.slice(1, 1 + n).map((v) => v.split(" is "));
const m = Number(input[1 + n]);
const results = input.slice(n + 2, n + 2 + m).map((v) => v.split(" is "));

const adjacantList = {};
info.forEach((v) => {
  const [a, b] = v;
  adjacantList[a] = b;
});

results.forEach((v) => {
  const [a, b] = v;

  if (DFS(a, b)) console.log("T");
  else console.log("F");
});

function DFS(node, target) {
  if (node === target) return true;

  if (adjacantList[node]) {
    if (DFS(adjacantList[node], target)) return true;
  } else {
    return false;
  }
}
