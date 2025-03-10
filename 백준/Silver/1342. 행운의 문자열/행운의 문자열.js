const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
let input = fs.readFileSync(filePath).toString().split("\n");

// 재배치 가능한거 다 구하고
// 행운의 문자열인지 확인
// 경우의 수 : 10! = 3,628,800

const givenStr = input[0].split("");
const visited = Array.from({ length: givenStr.length }).fill(false);
const candidate = new Set();
function DFS(path) {
  if (path.length === givenStr.length) {
    candidate.add([...path].join(""));
    return;
  }
  for (let i = 0; i < givenStr.length; i++) {
    if (!visited[i]) {
      visited[i] = true;
      path.push(givenStr[i]);
      DFS(path);
      visited[i] = false;
      path.pop();
    }
  }
}

for (let i = 0; i < givenStr.length; i++) {
  visited[i] = true;
  DFS([givenStr[i]]);
  visited[i] = false;
}

const convertToArrOfSet = [...candidate];

function checkLuckyStr(str) {
  let idx = 0;
  let isLucky = true;

  while (idx < str.length - 1) {
    if (str[idx] === str[idx + 1]) {
      isLucky = false;
      break;
    }
    idx++;
  }
  return isLucky;
}

let answer = 0;
convertToArrOfSet.forEach((v) => {
  if (checkLuckyStr(v)) answer++;
});

console.log(answer);
