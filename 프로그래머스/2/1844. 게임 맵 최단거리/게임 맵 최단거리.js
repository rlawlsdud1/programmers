function solution(maps) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const queue = [];
  queue.push([0, 0, 1]); // 시작좌표 및 거리

  while (queue.length) {
    const [x, y, distance] = queue.shift();

    if (x === maps.length - 1 && y === maps[0].length - 1) {
      return distance;
    }

    for (let i = 0; i < directions.length; i++) {
      // 새롭게 갈 수 있는 좌표
      const [nx, ny] = [x + directions[i][0], y + directions[i][1]];

      // 실제로 갈 수 있는지 체크
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < maps.length &&
        ny < maps[0].length &&
        maps[nx][ny] === 1
      ) {
        // 갈 수 있다면 방문처리하고, queue에 push
        // distance는 기존 지점의 distance + 1
        maps[nx][ny] = 0;
        queue.push([nx, ny, distance + 1]);
      }
    }
  }

  // 갈 수 있는 곳을 다 체크했는데 목표지점에 도달하지 못한다면
  return -1;
}