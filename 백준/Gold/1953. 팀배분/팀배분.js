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

const n = Number(input[0]);
const info = input.slice(1, 1 + n).map((v) => v.split(" ").map(Number));
const adjacantList = Array.from({ length: n + 1 }, () => []);

info.forEach((v, i) => {
  const [_, ...hatePeople] = v;

  hatePeople.forEach((p) => {
    adjacantList[i + 1].push(p);
  });
});

const colors = Array.from({ length: n + 1 }).fill(-1);

for (let start = 1; start <= n; start++) {
  if (colors[start] === -1) {
    const queue = [];
    queue.push(start);
    colors[start] = 0;

    while (queue.length) {
      const node = queue.shift();

      for (const adjacantNode of adjacantList[node]) {
        if (colors[adjacantNode] === -1) {
          colors[adjacantNode] = 1 - colors[node];
          queue.push(adjacantNode);
        }
      }
    }
  }
}

const whiteTeam = [];
const blueTeam = [];

for (let i = 1; i <= n; i++) {
  if (colors[i] === 0) whiteTeam.push(i);
  else blueTeam.push(i);
}

whiteTeam.sort((a, b) => a - b);
blueTeam.sort((a, b) => a - b);

console.log(whiteTeam.length);
console.log(whiteTeam.join(" "));
console.log(blueTeam.length);
console.log(blueTeam.join(" "));
