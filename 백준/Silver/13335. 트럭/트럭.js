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

let [n, w, L] = input[0].split(" ").map(Number);
// n은 트럭의 수, w는 다리의 길이, L은 다리의 최대 하중
const info = input[1].split(" ").map(Number);

const bridge = Array.from({ length: w }).fill(0);

let count = 0; // 시간을 관리하기 위한 변수
const destination = []; // 도착한 트럭들을 관리하는 배열

while (1) {
  const curTruck = info[0]; // 트럭에 올릴지 말지 확인하는 놈

  const pointer = bridge.shift();
  const sum = bridge.reduce((acc, cur) => acc + cur, 0);

  if (pointer !== 0) destination.push(pointer);

  if (sum + curTruck <= L) {
    bridge.push(curTruck);
    info.shift();
  } else {
    bridge.push(0);
  }

  count++;
  if (destination.length === n) break;
}

console.log(count);
