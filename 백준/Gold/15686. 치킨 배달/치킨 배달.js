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
const info = input.slice(1, 1 + N).map((v) => v.split(" ").map(Number));

// 각 칸은 빈칸, 치킨집, 집 중 하나이다.
// 치킨 거리는 집과 가장 가까운 치킨집 사이의 거리이다.
// 도시의 치킨 거리는 모든 집의 치킨 거리의 합이다.
// 임의의 두 칸 (r1, c1)과 (r2, c2) 사이의 거리는 |r1-r2| + |c1-c2|로 구한다.
// 치킨집의 개수는 M보다 크거나 같고, 13보다 작거나 같다.

// (2의 개수) C M 개의 조합을 구하고
// 최솟값을 구한다.

const chickenLocation = []; // 치킨집 위치
const houseLocation = []; // 집 위치
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (info[i][j] === 2) chickenLocation.push([i, j]);
    else if (info[i][j] === 1) houseLocation.push([i, j]);
  }
}

let answer = Infinity;

function BT(start, path) {
  if (path.length === M) {
    const distance = calculateMinDist(houseLocation, path);
    answer = Math.min(answer, distance);
    return;
  }

  for (let i = start; i < chickenLocation.length; i++) {
    path.push(chickenLocation[i]);
    BT(i + 1, path);
    path.pop();
  }
}

BT(0, []);

function calculateMinDist(house, combination) {
  let distance = 0;

  house.forEach((v) => {
    const [x, y] = v;

    let minDist = Infinity;
    combination.forEach((v) => {
      const [nx, ny] = v;
      minDist = Math.min(minDist, Math.abs(x - nx) + Math.abs(y - ny));
    });
    distance += minDist;
  });

  return distance;
}

console.log(answer);
