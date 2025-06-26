function solution(maps) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let startX, startY;

  const N = maps.length;
  const M = maps[0].length;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (maps[i][j] === "S") {
        startX = i;
        startY = j;
      }
    }
  }

  const queue = [];
  queue.push([startX, startY, false, 0]);
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => [false, false])
  );
  visited[startX][startY][0] = true;

  let count = 0;

  while (queue.length) {
    const [x, y, lever, count] = queue.shift();

    if (maps[x][y] === "E" && lever) {
      return count;
    }

    for (const direction of directions) {
      const [nx, ny] = [x + direction[0], y + direction[1]];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < M &&
        maps[nx][ny] !== "X" &&
        !visited[nx][ny][lever]
      ) {
        visited[nx][ny][lever] = true;

        if (maps[nx][ny] === "L") queue.push([nx, ny, !lever, count + 1]);
        else queue.push([nx, ny, lever, count + 1]);
      }
    }
  }

  return -1;
}

console.log(solution(["LOOXS", "OOOOX", "OOOOO", "OOOOO", "EOOOO"]));
