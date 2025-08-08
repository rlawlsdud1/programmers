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

const colors = new Set(["R", "G", "B", "P", "Y"]);
const map = input.map((v) => v.split(""));
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

let count = 0;

// map 다 돌면서 터질 수 있는 그룹 체크
// 터질 수 있다면 . 으로 replace
// 더이상 터질 수 있는게 없다면 다 아래로 내리기

let visited = new Set();
let temp = [];

while (1) {
  let isPopped = false;

  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      const cur = map[i][j];
      if (colors.has(cur)) {
        visited.add(`${i},${j}`);
        temp.push(`${i},${j}`);

        DFS(i, j, cur);

        if (temp.length >= 4) {
          isPopped = true;
          temp.forEach((v) => {
            const [x, y] = v.split(",");
            map[x][y] = ".";
          });
        }

        temp = [];
      }
    }
  }

  for (let j = 0; j < 6; j++) {
    const tempCol = [];
    for (let i = 11; i >= 0; i--) {
      if (map[i][j] !== ".") {
        tempCol.push(map[i][j]);
        map[i][j] = ".";
      }
    }

    for (let k = 0; k < tempCol.length; k++) {
      map[11 - k][j] = tempCol[k];
    }
  }

  visited = new Set();

  if (!isPopped) break;
  count++;
}

console.log(count);

function DFS(x, y, color) {
  for (const direction of directions) {
    const [nx, ny] = [x + direction[0], y + direction[1]];

    if (
      nx >= 0 &&
      ny >= 0 &&
      nx < 12 &&
      ny < 6 &&
      !visited.has(`${nx},${ny}`) &&
      map[nx][ny] === color
    ) {
      temp.push(`${nx},${ny}`);
      visited.add(`${nx},${ny}`);

      DFS(nx, ny, color);
    }
  }
}
