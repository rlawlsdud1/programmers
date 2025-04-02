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
const map = input.slice(1, 1 + N).map((v) => v.split(" "));

const teachersPosition = [];
const candidate = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === "T") teachersPosition.push([i, j]);
    else if (map[i][j] === "X") candidate.push([i, j]);
  }
}

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let isPossible;
let answer;

function BT(combination, start) {
  if (combination.length === 3) {
    const copiedMap = JSON.parse(JSON.stringify(map));
    combination.forEach((v) => {
      const [x, y] = v;
      copiedMap[x][y] = "O";
    });

    isPossible = true;
    for (let i = 0; i < teachersPosition.length; i++) {
      const [x, y] = teachersPosition[i];
      findStudent(x, y, copiedMap);
    }

    // 가능한 경우가 있다면
    if (isPossible) answer = true;

    return;
  }

  for (let i = start; i < candidate.length; i++) {
    combination.push(candidate[i]);
    BT(combination, i + 1);
    combination.pop();
  }
}

BT([], 0);

function findStudent(x, y, map) {
  for (let i = 0; i < 4; i++) {
    const [dx, dy] = directions[i];
    let [nx, ny] = [x + dx, y + dy];

    while (nx >= 0 && ny >= 0 && nx < N && ny < N && map[nx][ny] !== "O") {
      if (map[nx][ny] === "S") {
        isPossible = false;
        break;
      }

      nx += dx;
      ny += dy;
    }

    if (!isPossible) break;
  }
}

console.log(answer ? "YES" : "NO");


