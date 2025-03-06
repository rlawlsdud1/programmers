const fs = require("fs");
// 제출할때는 '/dev/stdin' 로 바꾸기
let input = fs.readFileSync("/dev/stdin").toString().split("\n");
input = input.map((v) => v.trim());
const N = Number(input[0]);
const info = input.slice(1).map((v) => v.split(" ").map(Number));

// 끝나는 시간이 빨라야 다음 회의를 잡을 수 있다
// 2번째 원소를 기준으로 오름차순 정렬
// 같다면 1번째 원소를 기준으로 오름차순 정렬

info.sort((a, b) => {
  if (a[1] === b[1]) {
    return a[0] - b[0];
  }
  return a[1] - b[1];
});

let count = 1;
let endTime = info[0][1];
for (let i = 1; i < N; i++) {
  const startTime = info[i][0];

  if (endTime <= startTime) {
    endTime = info[i][1];
    count++;
  }
}

console.log(count);