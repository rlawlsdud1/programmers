const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

input = input.map((v) => v.trim());
const [N, M] = input[0].split(" ").map(Number);

const info = input.slice(1).map((v) => v.split(" ").map(Number));

const indegreeTable = Array.from({ length: N + 1 }).fill(0);
const adjacantList = Array.from({ length: N + 1 }, () => []);

info.forEach((v) => {
  const [a, b] = v;
  adjacantList[a].push(b);
  indegreeTable[b] += 1;
});

const answer = [];
const queue = [];
for (let i = 1; i <= N; i++) {
  if (!indegreeTable[i]) {
    queue.push(i);
    answer.push(i);
  }
}
while (queue.length) {
  const student = queue.shift();

  for (let i = 0; i < adjacantList[student].length; i++) {
    const adjacantStudent = adjacantList[student][i];
    indegreeTable[adjacantStudent] -= 1;

    if (!indegreeTable[adjacantStudent]) {
      queue.push(adjacantStudent);
      answer.push(adjacantStudent);
    }
  }
}

console.log(answer.join(" "));
