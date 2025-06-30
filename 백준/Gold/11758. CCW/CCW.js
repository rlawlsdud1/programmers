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

// P1, P2, P3를 순서대로 이은 선분이
// 반시계 방향을 나타내면 1, 시계 방향이면 -1, 일직선이면 0을 출력
const [P1, P2, P3] = input.map((v) => v.split(" ").map(Number));

function getInclination(p1, p2) {
  const [x1, y1] = p1;
  const [x2, y2] = p2;

  if (y1 === y2) return "x";
  else if (x1 === x2) return "y";
  else return (y2 - y1) / (x2 - x1);
}

const firstInclination = getInclination(P1, P2);
const secondInclination = getInclination(P2, P3);
if (firstInclination === secondInclination) {
  console.log(0);
  process.exit(0);
}

function getLinearEquation(inclination, point) {
  const [x1, y1] = point;

  const linearEquation = function (x) {
    return inclination * (x - x1) + y1;
  };

  return linearEquation;
}
const [x1, y1] = P1;
const [x2, y2] = P2;
const [x3, y3] = P3;

if (firstInclination === "x") {
  if (x1 < x2) {
    if (y3 > y2) console.log(1);
    else console.log(-1);
  } else {
    if (y3 > y2) console.log(-1);
    else console.log(1);
  }
} else if (firstInclination === "y") {
  if (y1 < y2) {
    if (x3 > x2) console.log(-1);
    else console.log(1);
  } else {
    if (x3 > x2) console.log(1);
    else console.log(-1);
  }
} else {
  if (x1 > x2) {
    if (getLinearEquation(firstInclination, P2)(x3) < y3) console.log(-1);
    else console.log(1);
  } else {
    if (getLinearEquation(firstInclination, P2)(x3) < y3) console.log(1);
    else console.log(-1);
  }
}
