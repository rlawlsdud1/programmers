function solution(maps) {
  const queue = [];
  const n = maps.length;
  const m = maps[0].length;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  maps[0][0] = 0;
  queue.push([0, 0, 1]);

  while (queue.length > 0) {
    const [x, y, distance] = queue.shift();

    // queue에서 꺼낸게 탈출구인지?
    if (x === n - 1 && y === m - 1) {
      return distance;
    }

    // 4방향 탐색
    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + directions[i][0], y + directions[i][1]];

      // 갈 수 있는 곳이면 방문처리하고 enqueue
      if (nx >= 0 && ny >= 0 && nx < n && ny < m && maps[nx][ny] === 1) {
        maps[nx][ny] = 0;
        queue.push([nx, ny, distance + 1]);
      }
    }
  }

  // while loop가 진행되는 동안 탈출구를 못찾았으면 -1 return
  return -1;
}