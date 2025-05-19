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

const T = Number(input[0]);
const info = input.slice(1);
let parent = {};
let size = {};

let idx = 0;

for (let i = 0; i < T; i++) {
  const F = Number(info[idx++]);
  parent = {};
  size = {};

  for (let j = 0; j < F; j++) {
    const [a, b] = info[idx++].split(" ");

    if (!parent[a]) {
      parent[a] = a;
      size[a] = 1;
    }

    if (!parent[b]) {
      parent[b] = b;
      size[b] = 1;
    }

    const count = union(a, b);
    console.log(count);
  }
}

function find(x) {
  if (parent[x] !== x) {
    parent[x] = find(parent[x]);
  }
  return parent[x];
}

function union(x, y) {
  const rootX = find(x);
  const rootY = find(y);

  if (rootX === rootY) return size[rootX];

  if (size[rootX] < size[rootY]) {
    parent[rootX] = rootY;
    size[rootY] += size[rootX];
    return size[rootY];
  } else {
    parent[rootY] = rootX;
    size[rootX] += size[rootY];
    return size[rootX];
  }
}
