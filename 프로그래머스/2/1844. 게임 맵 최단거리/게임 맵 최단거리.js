function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // maps를 직접 수정하면서 방문기록을 갱신
  // 방문 배열 필요 X

  const queue = [];
  queue.push([0, 0, 1]); // 좌표와 거리로 구성된 배열

  while (queue.length) {
    const [x, y, distance] = queue.shift();

    if (x === n - 1 && y === m - 1) {
      return distance;
    }

    for (let i = 0; i < directions.length; i++) {
      const [nx, ny] = [x + directions[i][0], y + directions[i][1]];

      if (nx >= 0 && ny >= 0 && nx < n && ny < m && maps[nx][ny] === 1) {
        queue.push([nx, ny, distance + 1]);
        maps[nx][ny] = 0;
      }
    }
  }

  // 반복문이 돌때까지 도착지점에 도달하지 못한다면
  return -1;
}