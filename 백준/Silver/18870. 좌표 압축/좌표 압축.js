const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

const N = Number(input[0]);
const coordinates = input[1].split(" ").map(Number);

// 등수로 바꾸는거 같은데
// 같으면 같은 등수고
// 2 4 -10 4 -9
// 2 3 0 3 1
// 로 바뀐다
// 반복문 한번에 끝내야 한다

const setCoordinates = new Set();
coordinates.forEach((v) => {
  setCoordinates.add(v);
});
const sortedCoordinates = [...setCoordinates].sort((a, b) => a - b);
const rankedCoordinates = {};
sortedCoordinates.forEach((v, i) => {
  rankedCoordinates[v] = i;
});

const answer = [];
coordinates.forEach((v) => {
  answer.push(rankedCoordinates[v]);
});

console.log(answer.join(" "));
