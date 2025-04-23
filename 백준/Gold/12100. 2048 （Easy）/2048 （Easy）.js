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
const map = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
const directions = ["U", "R", "D", "L"];
let answer = 0;

function getCount(map, count) {
  if (count === 5) {
    answer = Math.max(answer, getMaxValue(map));
    return;
  }

  for (const direction of directions) {
    const copiedMap = JSON.parse(JSON.stringify(map));
    getCount(changeMap(direction, copiedMap), count + 1);
  }
}

function changeMap(direction, map) {
  // 설정한 방향의 끝에 있는 원소부터 확인
  // 1) 위로 올릴 수 있으면 올린다.
  // 2) 위로 올리는데, 수가 같다면 합친다
  // 3) 이 때, 중복된 합침을 방지하기 위해 flag를 세운다
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: N }).fill(false)
  );

  if (direction === "U") {
    for (let j = 0; j < N; j++) {
      // 열 단위로 처리
      for (let i = 0; i < N; i++) {
        // 빈칸이 아닌 수를 발견하면, 위로 올릴 수 있을만큼 올리고,
        // 수가 같다면 합친다
        if (map[i][j]) {
          let tempX, tempY;
          for (let k = i - 1; k >= 0; k--) {
            if (map[k][j] === 0) {
              tempX = k;
              tempY = j;
            } else if (map[k][j] === map[i][j] && !visited[k][j]) {
              map[k][j] *= 2;
              map[i][j] = 0;
              visited[k][j] = true;
            } else break;
          }

          if (tempX !== undefined && tempY !== undefined) {
            map[tempX][tempY] = map[i][j];
            map[i][j] = 0;
          }
        }
      }
    }
  } else if (direction === "R") {
    for (let i = 0; i < N; i++) {
      for (let j = N - 1; j >= 0; j--) {
        if (map[i][j]) {
          let tempX, tempY;
          for (let k = j + 1; k < N; k++) {
            if (map[i][k] === 0) {
              tempX = i;
              tempY = k;
            } else if (map[i][k] === map[i][j] && !visited[i][k]) {
              map[i][k] *= 2;
              map[i][j] = 0;
              visited[i][k] = true;
            } else break;
          }

          if (tempX !== undefined && tempY !== undefined) {
            map[tempX][tempY] = map[i][j];
            map[i][j] = 0;
          }
        }
      }
    }
  } else if (direction === "D") {
    for (let j = 0; j < N; j++) {
      for (let i = N - 1; i >= 0; i--) {
        if (map[i][j]) {
          let tempX, tempY;
          for (let k = i + 1; k < N; k++) {
            if (map[k][j] === 0) {
              tempX = k;
              tempY = j;
            } else if (map[k][j] === map[i][j] && !visited[k][j]) {
              map[k][j] *= 2;
              map[i][j] = 0;
              visited[k][j] = true;
            } else break;
          }

          if (tempX !== undefined && tempY !== undefined) {
            map[tempX][tempY] = map[i][j];
            map[i][j] = 0;
          }
        }
      }
    }
  } else {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (map[i][j]) {
          let tempX, tempY;
          for (let k = j - 1; k >= 0; k--) {
            if (map[i][k] === 0) {
              tempX = i;
              tempY = k;
            } else if (map[i][k] === map[i][j] && !visited[i][k]) {
              map[i][k] *= 2;
              map[i][j] = 0;
              visited[i][k] = true;
            } else break;
          }

          if (tempX !== undefined && tempY !== undefined) {
            map[tempX][tempY] = map[i][j];
            map[i][j] = 0;
          }
        }
      }
    }
  }
  return map;
}

function getMaxValue(map) {
  let maxValue = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      maxValue = Math.max(maxValue, map[i][j]);
    }
  }

  return maxValue;
}

getCount(map, 0);
console.log(answer);
