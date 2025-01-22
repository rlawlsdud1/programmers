function solution(maps) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const queue = [];
  queue.push([0, 0, 1]);

  while (queue.length) {
    const [x, y, distance] = queue.shift();

    if (x === maps.length - 1 && y === maps[0].length - 1) {
      return distance;
    }

    for (let i = 0; i < directions.length; i++) {
      const [nx, ny] = [x + directions[i][0], y + directions[i][1]];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < maps.length &&
        ny < maps[0].length &&
        maps[nx][ny] === 1
      ) {
        maps[nx][ny] = 0;
        queue.push([nx, ny, distance + 1]);
      }
    }
  }

  return -1;
}

// 최단거리