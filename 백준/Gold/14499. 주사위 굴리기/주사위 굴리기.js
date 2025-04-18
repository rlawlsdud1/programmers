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

let [N, M, x, y, K] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));
const commands = input[1 + N].split(" ").map(Number);
let dice = [0, 0, 0, 0, 0, 0];

const directions = {
  1: [0, 1],
  2: [0, -1],
  3: [-1, 0],
  4: [1, 0],
};

function changeDice(dice, direction) {
  if (direction === 1) {
    return [dice[5], dice[1], dice[4], dice[3], dice[0], dice[2]];
  } else if (direction === 2) {
    return [dice[4], dice[1], dice[5], dice[3], dice[2], dice[0]];
  } else if (direction === 3) {
    return [dice[0], dice[4], dice[2], dice[5], dice[3], dice[1]];
  } else {
    return [dice[0], dice[5], dice[2], dice[4], dice[1], dice[3]];
  }
}

commands.forEach((d) => {
  const [nx, ny] = [x + directions[d][0], y + directions[d][1]];
  if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
    x = nx;
    y = ny;

    dice = changeDice(dice, d);

    if (map[nx][ny] === 0) {
      map[nx][ny] = dice[5];
    } else {
      dice[5] = map[nx][ny];
      map[nx][ny] = 0;
    }

    console.log(dice[4]);
  }
});
