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
const map = input.slice(1).map((v) => v.split(""));
const directionObj = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

const parent = {};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    parent[`${i},${j}`] = `${i},${j}`;
  }
}

function find(target) {
  if (target !== parent[target]) {
    parent[target] = find(parent[target]);
  }

  return parent[target];
}

function union(x, y) {
  const rootX = find(x);
  const rootY = find(y);

  if (rootX !== rootY) {
    parent[rootX] = rootY;
  }
}

for (let x = 0; x < N; x++) {
  for (let y = 0; y < M; y++) {
    const cur = parent[`${x},${y}`];
    const dir = map[x][y];

    const [nx, ny] = [x + directionObj[dir][0], y + directionObj[dir][1]];

    if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
      const next = `${nx},${ny}`;

      if (find(next) !== find(cur)) union(cur, next);
    }
  }
}

const answerSet = new Set();
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const cur = `${i},${j}`;
    answerSet.add(find(parent[cur]));
  }
}

console.log(answerSet.size);
