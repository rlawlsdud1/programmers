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

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1, 1 + N).map((v) => v.split(""));
let [curX, curY] = input[1 + N].split(" ").map(Number);

// 행성은 '/'와 '\'로 표현되는 두 종류가 있다
// 시그널이 블랙홀이 있는 칸을 만나거나 항성계를 벗어날 때 까지 계속 전파된다.
// 시그널이 인접한 칸으로 이동하는데 걸리는 시간은 1초

// 탐사선이 어느 방향으로 시그널을 보내면,
// 시그널이 항성계 내부에 있는 시간이 최대가 되는지

// 반사되는 경우는 총 8가지가 있다

// 시계방향인지 반시계방향인지 확인하는 방법이 있긴 하겠지만,
// 그럴 바에 그냥 이렇게 해서 시간을 일단 아껴보자
function checkReflectDirection(planet, curDirecion) {
  if (planet === "/") {
    if (curDirecion === "U") return "R";
    else if (curDirecion === "R") return "U";
    else if (curDirecion === "D") return "L";
    else return "D";
  } else {
    if (curDirecion === "U") return "L";
    else if (curDirecion === "R") return "D";
    else if (curDirecion === "D") return "R";
    else return "U";
  }
}

const directions = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};

function calculateCnt(direction, x, y) {
  const checkDupObj = {};
  checkDupObj[`${x},${y}`] = 1;
  let canGoOutside = true;

  let count = 1;
  while (1) {
    x += directions[direction][0];
    y += directions[direction][1];

    if (x >= 0 && y >= 0 && x < N && y < M) {
      if (map[x][y] === "C") break;
      else if (map[x][y] !== ".") {
        direction = checkReflectDirection(map[x][y], direction);
      }
      checkDupObj[`${x},${y}`]
        ? (checkDupObj[`${x},${y}`] += 1)
        : (checkDupObj[`${x},${y}`] = 1);

      if (checkDupObj[`${x},${y}`] >= 3) {
        canGoOutside = false;
        break;
      }
    } else break;

    count++;
  }
  if (!canGoOutside) return false;
  return count;
}

const directionOrder = ["U", "R", "D", "L"];

let answerCnt = 0;
let answer = "";

for (const order of directionOrder) {
  const count = calculateCnt(order, curX - 1, curY - 1);
  if (count === false) {
    answer = order;
    answerCnt = "Voyager";
    break;
  } else if (count > answerCnt) {
    answerCnt = count;
    answer = order;
  }
}

console.log(answer);
console.log(answerCnt);

// 왔던 곳을 또 들린다 해서 무한히 전파가 되는건 아니고
// 어떤 기준으로 무한히 전파됨을 알 수 있을까
// 특정 점을 3번이상 중복 방문이 가능할까?
