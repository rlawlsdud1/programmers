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

const T = Number(input[0]);
let idx = 1;
for (let i = 0; i < T; i++) {
  const N = Number(input[idx++]);
  const info = input.slice(idx, idx + N).map((v) => v.split(" ").map(Number));

  // main logic
  info.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });

  // 서류 성적부터 석차 순으로 오름차순 정렬
  // 어떤 지원자는 앞에 있는 지원자보다 석차는 밀린다. 즉, 면접 순위라도 높아야 한다.
  // info 배열을 순회하면서 면접 석차 제일 높은걸로 갱신한다.
  // 그 값보다 낮자면 석차도, 면접도 밀리는 것이고 선발될 수 없다.

  let answer = 0;
  let max_interview_rank = Infinity;
  info.forEach((v) => {
    const [_, b] = v;

    if (max_interview_rank > b) answer++;
    max_interview_rank = Math.min(max_interview_rank, b);
  });

  console.log(answer);

  idx += N;
}
