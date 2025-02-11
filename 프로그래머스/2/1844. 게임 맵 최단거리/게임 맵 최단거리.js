function solution(maps) {
  // n x m 형태의 map
  // 필수적으로
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const queue = [];
  queue.push([0, 0, 1]);
  maps[0][0] = 0;

  // 하나씩 꺼낼거임
  while (queue.length) {
    const [x, y, distance] = queue.shift();

    if (x === maps.length - 1 && y === maps[0].length - 1) {
      return distance;
    }

    for (let i = 0; i < directions.length; i++) {
      const [nx, ny] = [x + directions[i][0], y + directions[i][1]];

      // 실제로 갈 수 있는지를 체크할거임
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < maps.length &&
        ny < maps[0].length &&
        maps[nx][ny] === 1
      ) {
        // 실제로 갈 수 있다면 다시 queue에 넣어줄거임
        queue.push([nx, ny, distance + 1]);
        // maps 를 바꿔줄거임.
        maps[nx][ny] = 0;
      }
    }
  }//

  return -1;
}