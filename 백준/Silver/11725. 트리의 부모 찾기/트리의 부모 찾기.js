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
const info = input.slice(1, N).map((v) => v.split(" ").map(Number));

const tree = Array.from({ length: N + 1 }, () => []);
info.forEach((v) => {
  const [a, b] = v;
  tree[a].push(b);
  tree[b].push(a);
});

const visited = Array.from({ length: N + 1 }).fill(false);
visited[1] = true;

const answer = Array.from({ length: N + 1 }).fill(0);

const queue = [1];

while (queue.length) {
  const node = queue.shift();

  for (const adjacantNode of tree[node]) {
    if (!visited[adjacantNode]) {
      queue.push(adjacantNode);
      visited[adjacantNode] = true;
      answer[adjacantNode] = node;
    }
  }
}

const output = answer.slice(2).join("\n");
console.log(output);
