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

const prefix = Array.from({ length: N + 1 }, () =>
  Array.from({ length: N + 1 }).fill(0)
);
for (let j = 1; j <= N; j++) {
  prefix[1][j] = prefix[1][j - 1] + info[0][j - 1];
}

for (let i = 1; i <= N; i++) {
  prefix[i][1] = prefix[i - 1][1] + info[i - 1][0];
}

for (let i = 2; i <= N; i++) {
  for (let j = 2; j <= N; j++) {
    prefix[i][j] =
      prefix[i][j - 1] +
      prefix[i - 1][j] -
      prefix[i - 1][j - 1] +
      info[i - 1][j - 1];
  }
}

let answer = -Infinity;

let K = 1;
while (K <= N) {
  for (let i = K; i <= N; i++) {
    for (let j = K; j <= N; j++) {
      const temp =
        prefix[i][j] -
        prefix[i - K][j] -
        prefix[i][j - K] +
        prefix[i - K][j - K];

      answer = Math.max(answer, temp);
    }
  }

  K++;
}

console.log(answer);
