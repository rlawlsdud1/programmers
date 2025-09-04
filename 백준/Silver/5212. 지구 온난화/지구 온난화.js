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

const [R, C] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + R).map((v) => v.split(""));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const candidate = [];
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (map[i][j] === "X") {
      let count = 0;

      for (const direction of directions) {
        const [nx, ny] = [i + direction[0], j + direction[1]];

        if (nx >= 0 && ny >= 0 && nx < R && ny < C) {
          if (map[nx][ny] === ".") count++;
        } else count++;
      }

      if (count >= 3) candidate.push([i, j]);
    }
  }
}

candidate.forEach((v) => {
  const [x, y] = v;
  map[x][y] = ".";
});

// row check
let startRow, endRow;
for (let i = 0; i < R; i++) {
  if (startRow !== undefined) {
    if (map[i].includes("X")) {
      endRow = i;
    }
  } else {
    if (map[i].includes("X")) {
      startRow = i;
      endRow = i;
    }
  }
}

// col check
let startCol, endCol;

for (let j = 0; j < C; j++) {
  for (let i = 0; i < R; i++) {
    if (startCol !== undefined) {
      if (map[i][j] === "X") {
        endCol = j;
      }
    } else {
      if (map[i][j] === "X") {
        startCol = j;
        endCol = j;
      }
    }
  }
}

const rowSlicedMap = map.slice(startRow, endRow + 1);
const slicedMap = rowSlicedMap.map((v) => v.slice(startCol, endCol + 1));

slicedMap.forEach((v) => {
  console.log(v.join(""));
});
