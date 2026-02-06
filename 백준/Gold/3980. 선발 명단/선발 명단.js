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

const C = Number(input[0]);

let answer = 0;

for (let count = 0; count < C; count++) {
  const abilities = input
    .slice(1 + count * 11, (count + 1) * 11 + 1)
    .map((v) => v.split(" ").map(Number));

  BT(0, new Set(), 0, abilities);

  console.log(answer);
  answer = 0;
}

function BT(cur_player, checked_set, point, abilities) {
  if (cur_player === 11) {
    answer = Math.max(answer, point);
    return;
  }

  for (let position = 0; position < 11; position++) {
    if (!checked_set.has(position) && abilities[cur_player][position]) {
      checked_set.add(position);

      BT(
        cur_player + 1,
        checked_set,
        point + abilities[cur_player][position],
        abilities,
      );

      checked_set.delete(position);
    }
  }
}
