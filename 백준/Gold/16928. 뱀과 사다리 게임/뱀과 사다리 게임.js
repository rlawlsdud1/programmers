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

const [N, M] = input[0].split(" ").map(Number);
const ladders = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
const snakes = input.slice(1 + N).map((v) => v.split(" ").map(Number));
let adjacantList = Array.from({ length: 101 }, () => []);
adjacantList = adjacantList.map((v) => v.sort((a, b) => b - a));

const ladderSet = new Set();
const snakeSet = new Set();
ladders.forEach((v) => {
  const [from, at] = v;

  adjacantList[from].push(at);
  ladderSet.add(from);
});
snakes.forEach((v) => {
  const [from, at] = v;
  adjacantList[from].push(at);
  snakeSet.add(from);
});

for (let i = 1; i < 100; i++) {
  if (!ladderSet.has(i) && !snakeSet.has(i)) {
    for (let j = i + 1; j <= Math.min(100, i + 6); j++) {
      adjacantList[i].push(j);
    }
  }
}

const visited = Array.from({ length: 101 }).fill(false);

const queue = [];
queue.push([1, 0]);
while (queue.length) {
  const [pointer, count] = queue.shift();
  if (pointer === 100) {
    console.log(count);
    break;
  }

  if (adjacantList[pointer].length === 1) {
    const adjacantNode = adjacantList[pointer][0];
    visited[adjacantNode] = true;
    for (let i = 0; i < adjacantList[adjacantNode].length; i++) {
      const a = adjacantList[adjacantNode][i];
      if (!visited[a]) {
        visited[a] = true;
        queue.push([a, count + 1]);
      }
    }
  } else {
    for (let i = 0; i < adjacantList[pointer].length; i++) {
      const adjacantNode = adjacantList[pointer][i];
      if (!visited[adjacantNode]) {
        visited[adjacantNode] = true;
        queue.push([adjacantNode, count + 1]);
      }
    }
  }
}
