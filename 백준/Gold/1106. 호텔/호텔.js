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

const [C, N] = input[0].split(" ").map(Number);
const info = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));

const dpTable = Array.from({ length: N + 1 }, () =>
  Array.from({ length: C + 1 }).fill(Infinity)
);

for (let i = 1; i <= N; i++) {
  const [cost, customerCnt] = info[i - 1];

  for (let j = 1; j <= C; j++) {
    if (j - customerCnt > 0) {
      dpTable[i][j] = Math.min(
        dpTable[i - 1][j],
        dpTable[i][j - customerCnt] + cost,
        Math.ceil(j / customerCnt) * cost
      );
    } else {
      dpTable[i][j] = Math.min(
        dpTable[i - 1][j],
        Math.ceil(j / customerCnt) * cost
      );
    }
  }
}

console.log(dpTable[N][C]);
