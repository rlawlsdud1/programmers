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

const testNum = Number(input[0]);
let info = input.slice(1);

class Points {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

for (let i = 0; i < testNum; i++) {
  const storeNum = Number(info[0]);
  const coordinates = info.slice(1, 3 + storeNum);
  const nodes = [];

  coordinates.forEach((v) => {
    const [x, y] = v.split(" ").map(Number);
    nodes.push(new Points(x, y));
  });

  const adjacantList = Array.from({ length: storeNum + 2 }, () => []);
  for (let j = 0; j < nodes.length - 1; j++) {
    for (let k = j + 1; k < nodes.length; k++) {
      if (
        Math.abs(nodes[j].x - nodes[k].x) + Math.abs(nodes[j].y - nodes[k].y) <=
        1000
      ) {
        adjacantList[j].push(k);
        adjacantList[k].push(j);
      }
    }
  }

  const visited = Array.from({ length: storeNum + 2 }).fill(false);
  const queue = [];
  queue.push(0);
  visited[0] = true;

  let isPossible = false;
  while (queue.length) {
    const node = queue.shift();

    if (node === storeNum + 1) {
      isPossible = true;
    }

    for (const adjacantNode of adjacantList[node]) {
      if (!visited[adjacantNode]) {
        visited[adjacantNode] = true;
        queue.push(adjacantNode);
      }
    }
  }

  console.log(isPossible ? "happy" : "sad");
  info = info.slice(storeNum + 3);
}
