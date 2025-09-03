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

const m = Number(input[0]);
const starInfo = input.slice(1, 1 + m).map((v) => v.split(" ").map(Number));
const n = Number(input[1 + m]);
const info = input.slice(2 + m, 2 + m + n).map((v) => v.split(" ").map(Number));
const infoSet = new Set([...input.slice(2 + m, 2 + m + n)]);

info.forEach((v) => {
  const [x, y] = v;

  starInfo.forEach((e) => {
    const checkSet = new Set();
    const [i, j] = e;

    const [dx, dy] = [x - i, y - j];

    for (let k = 0; k < m; k++) {
      const [nx, ny] = [starInfo[k][0] + dx, starInfo[k][1] + dy];
      checkSet.add(`${nx} ${ny}`);
    }

    let canContinue = true;

    checkSet.forEach((c) => {
      if (!infoSet.has(c)) {
        canContinue = false;
      }
    });

    if (canContinue) {
      console.log(dx, dy);
      process.exit(0);
    }
  });
});
