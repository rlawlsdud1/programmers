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

const N = Number(input[0]);
const standard = input[1].split(" ").map(Number);
const info = input.slice(2, 2 + N).map((v) => v.split(" ").map(Number));

let answer = Infinity;
let answerCombi = [];

function BT(combi, next) {
  if (next === N + 1) return;

  let sumOfIngredients = [0, 0, 0, 0, 0]; // 마지막은 가격

  combi.forEach((v) => {
    info[v - 1].forEach((e, i) => {
      sumOfIngredients[i] += e;
    });
  });

  let isPossible = true;

  for (let i = 0; i < 4; i++) {
    if (standard[i] > sumOfIngredients[i]) {
      isPossible = false;
      break;
    }
  }

  if (isPossible) {
    const price = sumOfIngredients[4];
    if (answer > price) {
      answer = price;
      answerCombi = [...combi];
    } else if (answer === price) {
      const temp = [answerCombi.join(","), combi.join(",")].sort();
      answerCombi = temp[0].split(",");
    }
  }

  for (let i = next + 1; i <= N; i++) {
    combi.push(i);
    BT(combi, i);
    combi.pop();
  }
}

BT([], 0);

if (answer === Infinity) {
  console.log(-1);
} else {
  console.log(answer);
  console.log(answerCombi.join(" "));
}
