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
const map = input.slice(1, 1 + N).map((v) => v.split(""));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => new Set())
);

// visited의 각 원소는
// Set인데, 이는 각 status(열쇠를 들지 않고 방문했을 때, 열쇠를 들고 방문했을 때)
// 를 반영하기 위한 Set이다.
// 가령 !visited[i][j].has(0) 이라면
// 열쇠를 열쇠를 들지 않고 방문한 적이 없다는 뜻이다

const keys = ["a", "b", "c", "d", "e", "f"];
const keySet = new Set();
keys.forEach((key) => {
  keySet.add(key);
});

const romms = keys.map((k) => k.toUpperCase());
const rommSet = new Set();
romms.forEach((room) => {
  rommSet.add(room);
});

let startX, startY, endX, endY;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === "0") {
      startX = i;
      startY = j;
      map[i][j] = ".";
    } else if (map[i][j] === "1") {
      endX = i;
      endY = j;
    }
  }
}

const queue = [];
const startSet = new Set();
startSet.add(" ");
queue.push([startX, startY, 0, startSet]); // [시작 지점, count, 어떤 열쇠 들고 있는지]
visited[startX][startY].add(" ");

while (queue.length) {
  const [x, y, count, keys] = queue.shift();

  for (const direction of directions) {
    const [nx, ny] = [x + direction[0], y + direction[1]];
    if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
      const parsedKeys = parseKeys(keys);
      const copiedKeys = copySet(keys);

      if (map[nx][ny] === "1") {
        console.log(count + 1);
        process.exit(0);
      } else if (map[nx][ny] === "." && !visited[nx][ny].has(parsedKeys)) {
        visited[nx][ny].add(parsedKeys);
        queue.push([nx, ny, count + 1, copiedKeys]);
      } else if (
        rommSet.has(map[nx][ny]) &&
        keys.has(map[nx][ny].toLowerCase()) &&
        !visited[nx][ny].has(parsedKeys)
      ) {
        // 문인 경우
        visited[nx][ny].add(parsedKeys);
        queue.push([nx, ny, count + 1, copiedKeys]);
      } else if (keySet.has(map[nx][ny]) && !visited[nx][ny].has(parsedKeys)) {
        // 열쇠인 경우
        copiedKeys.add(map[nx][ny]);
        if (!copiedKeys.has(map[nx][ny])) {
          visited[nx][ny].add(reverseParseKeys(parsedKeys, map[nx][ny]));
        } else {
          visited[nx][ny].add(parsedKeys);
        }
        queue.push([nx, ny, count + 1, copiedKeys]);
      }
    }
  }
}
console.log(-1);

function copySet(keys) {
  const copiedSet = new Set();
  keys.forEach((key) => {
    copiedSet.add(key);
  });
  return copiedSet;
}

function parseKeys(keys) {
  const keysArr = [];
  keys.forEach((k) => {
    keysArr.push(k);
  });
  keysArr.sort();

  return keysArr.join("");
}

function reverseParseKeys(keys, newKey) {
  const splitedKeys = keys.split("");
  splitedKeys.push(newKey);
  splitedKeys.sort();

  return splitedKeys.join("");
}
