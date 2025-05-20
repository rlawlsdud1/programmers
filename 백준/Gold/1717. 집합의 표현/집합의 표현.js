const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on("line", (line) => {
  input.push(line.trim());
}).on("close", () => {
  const [n, m] = input[0].split(" ").map(Number);
  const parent = Array.from({ length: n + 1 }, (_, i) => i);
  const answer = [];

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  }

  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) parent[rootY] = rootX;
  }

  for (let i = 1; i <= m; i++) {
    const [operation, a, b] = input[i].split(" ").map(Number);
    if (operation === 0) {
      union(a, b);
    } else {
      answer.push(find(a) === find(b) ? "YES" : "NO");
    }
  }

  console.log(answer.join("\n"));
});
