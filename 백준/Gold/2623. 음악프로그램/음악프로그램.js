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

const [N, M] = input[0].split(" ").map(Number);
const info = input.slice(1, 1 + M).map((v) => v.split(" ").map(Number));
const inDegree = Array.from({ length: N + 1 }).fill(0);
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const cntOfSingers = info[i][0];
  const singers = info[i].slice(1, 1 + cntOfSingers);

  for (let j = 0; j < cntOfSingers - 1; j++) {
    // j번째를 j+1 번째에 꽂는다
    const prev = singers[j];
    const next = singers[j + 1];

    graph[prev].push(next);
    inDegree[next]++;
  }
}

const answer = [];
const queue = [];
for (let i = 1; i <= N; i++) {
  if (!inDegree[i]) {
    queue.push(i);
    answer.push(i);
  }
}

while (queue.length) {
  const singer = queue.shift();

  for (const adjacant of graph[singer]) {
    inDegree[adjacant]--;

    if (!inDegree[adjacant]) {
      queue.push(adjacant);
      answer.push(adjacant);
    }
  }
}

if (answer.length === N) console.log(answer.join("\n"));
else console.log(0);
