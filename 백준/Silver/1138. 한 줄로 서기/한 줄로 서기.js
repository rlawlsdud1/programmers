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

const visited = Array.from({ length: N }).fill(false);
const answer = Array.from({ length: N });

for (let i = 0; i < N; i++) {
  const cur = info[i];

  let count = 0;

  for (let j = 0; j < N; j++) {
    if (cur === count && !visited[j]) {
      visited[j] = true;
      answer[j] = i + 1;
      break;
    } else if (!visited[j]) count++;
  }
}

console.log(answer.join(" "));
