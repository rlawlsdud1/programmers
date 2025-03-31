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

const [N, K] = input[0].split(" ").map(Number);
let rail = input[1].split(" ").map(Number);

// 올리는 위치 0 index
// 내리는 위치 N-1 index
let robotLocation = Array.from({ length: 2 * N }).fill(false);

let count = 0;
while (1) {
  count++;

  // 벨트가 각 칸 위에 있는 로봇과 함께 한 칸 회전
  rail.unshift(rail.pop());
  robotLocation.unshift(robotLocation.pop());

  robotLocation[N - 1] = false;

  // 먼저 올라간 로봇부터 회전하는 방향으로 한 칸 이동
  // 이동할 수 없다면 가만히 있는다
  for (let i = N - 2; i >= 0; i--) {
    // 내구도 남아있어야 하고, 이동하려는 칸에 로봇이 없어야 함
    if (robotLocation[i] && !robotLocation[i + 1] && rail[i + 1] >= 1) {
      rail[i + 1]--;
      robotLocation[i] = false;
      if (i + 1 !== N - 1) robotLocation[i + 1] = true;
    }
  }

  // 로봇 올리기
  if (rail[0] >= 1 && !robotLocation[0]) {
    robotLocation[0] = true;
    rail[0] -= 1;
  }

  if (rail.filter((v) => v <= 0).length >= K) break;
}

console.log(count);
