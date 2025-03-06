const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");
// 첫째 줄에 N과 K가 주어진다. (1 ≤ N ≤ 10, 1 ≤ K ≤ 100,000,000)
input = input.map((v) => v.trim());
let [N, K] = input[0].split(" ").map(Number);
const coins = input.slice(1).map(Number);

let answer = 0;

for (let i = N - 1; i >= 0; i--) {
  answer += Math.floor(K / coins[i]);
  K = K % coins[i];
}

console.log(answer);
