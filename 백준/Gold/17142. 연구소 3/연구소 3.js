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
const map = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));

// 백트래킹으로 활성 바이러스 M개 되면 bfs시작
// bfs를 기존 패턴으로 쓰면 안된다.
// 동시에 퍼지고, 시간초를 기록해야 하기 때문에.
// 또한 매 반복마다 map에 0이 남아있는지를 기록하기보다는
// 0의 개수를 미리 구해놓고, 깎는 방식으로 해야한다

let safeZoneCount = 0;
const viruses = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 2) viruses.push([i, j]);
    else if (map[i][j] === 0) safeZoneCount++;
  }
}

function BFS(activeViruses) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const queue = [];
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: N }).fill(false)
  );

  activeViruses.forEach((v) => {
    const [x, y] = v;
    visited[x][y] = true;
    queue.push([x, y]);
  });

  let count = 0; // 시간초를 담은 변수
  let safeAreaCount = safeZoneCount; // loop를 돌며 얘를 깎을거임. 0이 되면 다 퍼진 상황

  while (queue.length) {
    if (safeAreaCount === 0) return count;
    const queueLength = queue.length;

    // queue 길이만큼 반복. 한번에 퍼트리는 로직
    for (let i = 0; i < queueLength; i++) {
      const [x, y] = queue.shift();

      for (let j = 0; j < 4; j++) {
        const [nx, ny] = [x + directions[j][0], y + directions[j][1]];
        if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
          if (map[nx][ny] !== 1 && !visited[nx][ny]) {
            if (map[nx][ny] === 0) safeAreaCount--;

            visited[nx][ny] = true;
            queue.push([nx, ny]);
          }
        }
      }
    }

    // 한번 퍼트렸으면 count 1증가
    count++;
  }

  return Infinity;
}

let answer = Infinity;
function BT(start, path) {
  if (path.length === M) {
    const count = BFS(path);
    answer = Math.min(answer, count);
    return;
  }

  for (let i = start; i < viruses.length; i++) {
    path.push(viruses[i]);
    BT(i + 1, path);
    path.pop();
  }
}

BT(0, []);
console.log(answer === Infinity ? -1 : answer);
