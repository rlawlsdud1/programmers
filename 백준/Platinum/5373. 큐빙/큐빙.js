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

function initCube() {
  return {
    U: Array.from({ length: 3 }, () => Array(3).fill("w")),
    D: Array.from({ length: 3 }, () => Array(3).fill("y")),
    F: Array.from({ length: 3 }, () => Array(3).fill("r")),
    B: Array.from({ length: 3 }, () => Array(3).fill("o")),
    L: Array.from({ length: 3 }, () => Array(3).fill("g")),
    R: Array.from({ length: 3 }, () => Array(3).fill("b")),
  };
}

const T = Number(input[0]);
const info = input.slice(1);
let idx = 0;

for (let i = 0; i < T; i++) {
  const n = Number(info[idx++]);
  const operations = info[idx++].split(" ");
  const cubeObj = initCube();

  operations.forEach((opration) => {
    operateFunc(opration, cubeObj);
  });

  cubeObj.U.forEach((row) => {
    console.log(row.join(""));
  });
}

// 3 x 3 행렬 시계방향 회전시키는 함수
function clockwiseRotate(matrix) {
  const rotated = [];
  for (let i = 0; i < 3; i++) {
    rotated[i] = [];
    for (let j = 0; j < 3; j++) {
      rotated[i][j] = matrix[2 - j][i];
    }
  }

  return rotated;
}

// 3 x 3 행렬 반시계방향 회전시키는 함수
function counterClockwiseRotate(matrix) {
  const rotated = [];
  for (let i = 0; i < 3; i++) {
    rotated[i] = [];
    for (let j = 0; j < 3; j++) {
      rotated[i][j] = matrix[j][2 - i];
    }
  }

  return rotated;
}

function operateFunc(operation, cubeObj) {
  const [location, direction] = operation.split("");
  // 해당 면 돌리기
  if (direction === "+") {
    cubeObj[location] = clockwiseRotate(cubeObj[location]);
  } else {
    cubeObj[location] = counterClockwiseRotate(cubeObj[location]);
  }

  // 이웃한 면들 수정
  // 어떤 기준으로 바라보고, 행과 열을 설정해야 하는지 기준이 헷갈린다.
  // 한 방향을 기준으로 잡고 나머지 다 설정하면 될 듯 하다.
  // 순간 순간마다 하려니 헷갈렸다.

  // 윗면을 돌리면 LFRB 의 1행들이 바뀐다
  if (location === "U") {
    const temp = [cubeObj.F[0][0], cubeObj.F[0][1], cubeObj.F[0][2]];
    if (direction === "+") {
      cubeObj.F[0][0] = cubeObj.R[0][0];
      cubeObj.F[0][1] = cubeObj.R[0][1];
      cubeObj.F[0][2] = cubeObj.R[0][2];

      cubeObj.R[0][0] = cubeObj.B[0][0];
      cubeObj.R[0][1] = cubeObj.B[0][1];
      cubeObj.R[0][2] = cubeObj.B[0][2];

      cubeObj.B[0][0] = cubeObj.L[0][0];
      cubeObj.B[0][1] = cubeObj.L[0][1];
      cubeObj.B[0][2] = cubeObj.L[0][2];

      cubeObj.L[0][0] = temp[0];
      cubeObj.L[0][1] = temp[1];
      cubeObj.L[0][2] = temp[2];
    } else {
      cubeObj.F[0][0] = cubeObj.L[0][0];
      cubeObj.F[0][1] = cubeObj.L[0][1];
      cubeObj.F[0][2] = cubeObj.L[0][2];

      cubeObj.L[0][0] = cubeObj.B[0][0];
      cubeObj.L[0][1] = cubeObj.B[0][1];
      cubeObj.L[0][2] = cubeObj.B[0][2];

      cubeObj.B[0][0] = cubeObj.R[0][0];
      cubeObj.B[0][1] = cubeObj.R[0][1];
      cubeObj.B[0][2] = cubeObj.R[0][2];

      cubeObj.R[0][0] = temp[0];
      cubeObj.R[0][1] = temp[1];
      cubeObj.R[0][2] = temp[2];
    }
    // 아랫면을 돌리면 LFRB의 3행들이 바뀐다
  } else if (location === "D") {
    const temp = [cubeObj.F[2][0], cubeObj.F[2][1], cubeObj.F[2][2]];
    if (direction === "+") {
      cubeObj.F[2][0] = cubeObj.L[2][0];
      cubeObj.F[2][1] = cubeObj.L[2][1];
      cubeObj.F[2][2] = cubeObj.L[2][2];

      cubeObj.L[2][0] = cubeObj.B[2][0];
      cubeObj.L[2][1] = cubeObj.B[2][1];
      cubeObj.L[2][2] = cubeObj.B[2][2];

      cubeObj.B[2][0] = cubeObj.R[2][0];
      cubeObj.B[2][1] = cubeObj.R[2][1];
      cubeObj.B[2][2] = cubeObj.R[2][2];

      cubeObj.R[2][0] = temp[0];
      cubeObj.R[2][1] = temp[1];
      cubeObj.R[2][2] = temp[2];
    } else {
      cubeObj.F[2][0] = cubeObj.R[2][0];
      cubeObj.F[2][1] = cubeObj.R[2][1];
      cubeObj.F[2][2] = cubeObj.R[2][2];

      cubeObj.R[2][0] = cubeObj.B[2][0];
      cubeObj.R[2][1] = cubeObj.B[2][1];
      cubeObj.R[2][2] = cubeObj.B[2][2];

      cubeObj.B[2][0] = cubeObj.L[2][0];
      cubeObj.B[2][1] = cubeObj.L[2][1];
      cubeObj.B[2][2] = cubeObj.L[2][2];

      cubeObj.L[2][0] = temp[0];
      cubeObj.L[2][1] = temp[1];
      cubeObj.L[2][2] = temp[2];
    }
  } else if (location === "F") {
    const temp = [cubeObj.R[0][0], cubeObj.R[1][0], cubeObj.R[2][0]];
    if (direction === "+") {
      cubeObj.R[0][0] = cubeObj.U[2][0];
      cubeObj.R[1][0] = cubeObj.U[2][1];
      cubeObj.R[2][0] = cubeObj.U[2][2];

      cubeObj.U[2][0] = cubeObj.L[2][2];
      cubeObj.U[2][1] = cubeObj.L[1][2];
      cubeObj.U[2][2] = cubeObj.L[0][2];

      cubeObj.L[0][2] = cubeObj.D[0][0];
      cubeObj.L[1][2] = cubeObj.D[0][1];
      cubeObj.L[2][2] = cubeObj.D[0][2];

      cubeObj.D[0][0] = temp[2];
      cubeObj.D[0][1] = temp[1];
      cubeObj.D[0][2] = temp[0];
    } else {
      cubeObj.R[0][0] = cubeObj.D[0][2];
      cubeObj.R[1][0] = cubeObj.D[0][1];
      cubeObj.R[2][0] = cubeObj.D[0][0];

      cubeObj.D[0][2] = cubeObj.L[2][2];
      cubeObj.D[0][1] = cubeObj.L[1][2];
      cubeObj.D[0][0] = cubeObj.L[0][2];

      cubeObj.L[2][2] = cubeObj.U[2][0];
      cubeObj.L[1][2] = cubeObj.U[2][1];
      cubeObj.L[0][2] = cubeObj.U[2][2];

      cubeObj.U[2][0] = temp[0];
      cubeObj.U[2][1] = temp[1];
      cubeObj.U[2][2] = temp[2];
    }
  } else if (location === "R") {
    const temp = [cubeObj.B[0][0], cubeObj.B[1][0], cubeObj.B[2][0]];
    if (direction === "+") {
      cubeObj.B[0][0] = cubeObj.U[2][2];
      cubeObj.B[1][0] = cubeObj.U[1][2];
      cubeObj.B[2][0] = cubeObj.U[0][2];

      cubeObj.U[2][2] = cubeObj.F[2][2];
      cubeObj.U[1][2] = cubeObj.F[1][2];
      cubeObj.U[0][2] = cubeObj.F[0][2];

      cubeObj.F[2][2] = cubeObj.D[2][2];
      cubeObj.F[1][2] = cubeObj.D[1][2];
      cubeObj.F[0][2] = cubeObj.D[0][2];

      cubeObj.D[2][2] = temp[0];
      cubeObj.D[1][2] = temp[1];
      cubeObj.D[0][2] = temp[2];
    } else {
      cubeObj.B[0][0] = cubeObj.D[2][2];
      cubeObj.B[1][0] = cubeObj.D[1][2];
      cubeObj.B[2][0] = cubeObj.D[0][2];

      cubeObj.D[2][2] = cubeObj.F[2][2];
      cubeObj.D[1][2] = cubeObj.F[1][2];
      cubeObj.D[0][2] = cubeObj.F[0][2];

      cubeObj.F[2][2] = cubeObj.U[2][2];
      cubeObj.F[1][2] = cubeObj.U[1][2];
      cubeObj.F[0][2] = cubeObj.U[0][2];

      cubeObj.U[2][2] = temp[0];
      cubeObj.U[1][2] = temp[1];
      cubeObj.U[0][2] = temp[2];
    }
  } else if (location === "B") {
    const temp = [cubeObj.L[0][0], cubeObj.L[1][0], cubeObj.L[2][0]];
    if (direction === "+") {
      cubeObj.L[0][0] = cubeObj.U[0][2];
      cubeObj.L[1][0] = cubeObj.U[0][1];
      cubeObj.L[2][0] = cubeObj.U[0][0];

      cubeObj.U[0][2] = cubeObj.R[2][2];
      cubeObj.U[0][1] = cubeObj.R[1][2];
      cubeObj.U[0][0] = cubeObj.R[0][2];

      cubeObj.R[2][2] = cubeObj.D[2][0];
      cubeObj.R[1][2] = cubeObj.D[2][1];
      cubeObj.R[0][2] = cubeObj.D[2][2];

      cubeObj.D[2][0] = temp[0];
      cubeObj.D[2][1] = temp[1];
      cubeObj.D[2][2] = temp[2];
    } else {
      cubeObj.L[0][0] = cubeObj.D[2][0];
      cubeObj.L[1][0] = cubeObj.D[2][1];
      cubeObj.L[2][0] = cubeObj.D[2][2];

      cubeObj.D[2][0] = cubeObj.R[2][2];
      cubeObj.D[2][1] = cubeObj.R[1][2];
      cubeObj.D[2][2] = cubeObj.R[0][2];

      cubeObj.R[2][2] = cubeObj.U[0][2];
      cubeObj.R[1][2] = cubeObj.U[0][1];
      cubeObj.R[0][2] = cubeObj.U[0][0];

      cubeObj.U[0][2] = temp[0];
      cubeObj.U[0][1] = temp[1];
      cubeObj.U[0][0] = temp[2];
    }
  } else if (location === "L") {
    const temp = [cubeObj.F[0][0], cubeObj.F[1][0], cubeObj.F[2][0]];
    if (direction === "+") {
      cubeObj.F[0][0] = cubeObj.U[0][0];
      cubeObj.F[1][0] = cubeObj.U[1][0];
      cubeObj.F[2][0] = cubeObj.U[2][0];

      cubeObj.U[0][0] = cubeObj.B[2][2];
      cubeObj.U[1][0] = cubeObj.B[1][2];
      cubeObj.U[2][0] = cubeObj.B[0][2];

      cubeObj.B[2][2] = cubeObj.D[0][0];
      cubeObj.B[1][2] = cubeObj.D[1][0];
      cubeObj.B[0][2] = cubeObj.D[2][0];

      cubeObj.D[0][0] = temp[0];
      cubeObj.D[1][0] = temp[1];
      cubeObj.D[2][0] = temp[2];
    } else {
      cubeObj.F[0][0] = cubeObj.D[0][0];
      cubeObj.F[1][0] = cubeObj.D[1][0];
      cubeObj.F[2][0] = cubeObj.D[2][0];

      cubeObj.D[0][0] = cubeObj.B[2][2];
      cubeObj.D[1][0] = cubeObj.B[1][2];
      cubeObj.D[2][0] = cubeObj.B[0][2];

      cubeObj.B[2][2] = cubeObj.U[0][0];
      cubeObj.B[1][2] = cubeObj.U[1][0];
      cubeObj.B[0][2] = cubeObj.U[2][0];

      cubeObj.U[0][0] = temp[0];
      cubeObj.U[1][0] = temp[1];
      cubeObj.U[2][0] = temp[2];
    }
  }
}
