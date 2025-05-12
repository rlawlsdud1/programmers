function solution(places) {
  const answer = [];
  for (const place of places) {
    const map = place.map((v) => v.split(""));

    const peoples = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (map[i][j] === "P") peoples.push([i, j]);
      }
    }
    if (peoples.length === 0) {
      answer.push(1);
      continue;
    }

    let isPossible;
    for (let i = 0; i < peoples.length; i++) {
      const standard = peoples[i];
      const [x, y] = standard;
      map[x][y] = "O";
      isPossible = checkDist(map, standard);
      map[x][y] = "P";

      if (!isPossible) break;
    }

    answer.push(isPossible);
  }
  return answer;
}

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
function checkDist(map, standard) {
  let isPossible = 1;

  const visited = Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }).fill(false)
  );
  const [standardX, standardY] = standard;

  const queue = [];
  queue.push([standardX, standardY, 0]);
  visited[standardX][standardY] = true;

  while (queue.length) {
    const [x, y, dist] = queue.shift();
    if (dist > 2) continue;

    if (map[x][y] === "P" && dist <= 2) {
      return 0;
    }

    for (const direction of directions) {
      const [nx, ny] = [x + direction[0], y + direction[1]];
      if (nx >= 0 && ny >= 0 && nx < 5 && ny < 5) {
        if ((map[nx][ny] === "O" || map[nx][ny] === "P") && !visited[nx][ny]) {
          queue.push([nx, ny, dist + 1]);
          visited[nx][ny] = true;
        }
      }
    }
  }

  return isPossible;
}

// P는 응시자가 앉아있는 자리
// O는 빈 테이블
// X는 파티션

// 맨해튼 거리는 |r1 - r2| + |c1 - c2|
// 2 이하로 앉지 않기

