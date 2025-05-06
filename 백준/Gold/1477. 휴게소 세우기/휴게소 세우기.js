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

const [N, M, L] = input[0].split(" ").map(Number);
if (N === 0) {
  console.log(Math.ceil(L / (M + 1)));
  process.exit();
}

const info = input[1].split(" ").map(Number);
info.sort((a, b) => a - b);
info.unshift(0);
info.push(L);

const differenceOfRoad = [];
for (let i = 0; i < N + 1; i++) {
  differenceOfRoad.push(info[i + 1] - info[i]);
}

let left = 0,
  right = L;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  let count = 0;
  differenceOfRoad.forEach((v) => {
    count += Math.floor((v - 1) / mid);
  });

  if (count <= M) {
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}
console.log(left);
