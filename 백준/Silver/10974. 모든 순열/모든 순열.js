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

const visited = Array.from({ length: N + 1 }).fill(false);

const answer = [];
function BT(path) {
  if (path.length === N) {
    answer.push([...path]);
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      path.push(i);
      visited[i] = true;

      BT(path);
      path.pop();
      visited[i] = false;
    }
  }
}
BT([]);
answer.forEach((v) => {
  console.log(v.join(" "));
});
