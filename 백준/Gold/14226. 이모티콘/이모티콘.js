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

const S = Number(input[0]);

let queue = [];
queue.push([1, 0, 0]); // 화면, 클립보드, 시간
let second = 0;
const visited = new Set();
visited.add(`1,0,0`);

while (queue.length) {
  const temp = [];
  let index = 0;

  while (index < queue.length) {
    const [screen, clipBoard, time] = queue[index];
    if (second !== time) break;

    if (screen === S) {
      console.log(time);
      process.exit(0);
    }

    if (isVisit(screen, screen, time + 1, visited)) {
      visited.add(`${screen},${screen},${time + 1}`);
      temp.push([screen, screen, time + 1]);
    }

    if (
      clipBoard !== 0 &&
      isVisit(screen + clipBoard, clipBoard, time + 1, visited)
    ) {
      visited.add(`${screen + clipBoard},${clipBoard},${time + 1}`);
      temp.push([screen + clipBoard, clipBoard, time + 1]);
    }

    if (screen >= 1 && isVisit(screen - 1, clipBoard, time + 1, visited)) {
      visited.add(`${screen - 1},${clipBoard},${time + 1}`);
      temp.push([screen - 1, clipBoard, time + 1]);
    }

    index++;
  }

  queue = temp;
  second++;
}

function isVisit(screen, clipboard, time, visited) {
  if (visited.has(`${screen},${clipboard},${time}`)) return false;
  return true;
}
