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
const info = input.slice(1);
let idx = 0;

for (let i = 0; i < T; i++) {
  const N = Number(info[idx++]);
  const scores = info.slice(idx, idx + N).map((v) => v.split(" ").map(Number));

  // 문제에 주어지는 데이터는 점수가 아니라 순위
  // 서류 등수 기준으로 오름 차순
  scores.sort((a, b) => a[0] - b[0]);

  let interviewScore = scores[0][1];
  let count = 1;

  for (let j = 1; j < N; j++) {
    const curScore = scores[j];

    // 면접 점수라도 더 좋아야 선발된다.
    // 이 분기를 탈 때 인터뷰 순위를 갱신해주는 이유는,
    // 처음에 서류 등수 기준으로 오름차순 정렬했으니
    // 면접이라도 더 잘봐야 선발될텐데
    // 마지막으로 선발된 애의 면접 등수가 기준점이 될 수 밖에 없다
    // 다음으로 선발될 애는 마지막으로 선발된 애보다 면접을 더 잘봐야 한다
    if (curScore[1] < interviewScore) {
      count++;
      interviewScore = curScore[1];
    }
  }
  console.log(count);
  idx += N;
}
