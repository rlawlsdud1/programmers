function solution(maps) {
  let answer = 0;

  const n = maps.length;
  const m = maps[0].length;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const visited = Array.from({ length: n }, () =>
    Array.from({ length: m }).fill(false),
  );

  const queue = [];
  queue.push([0, 0, 1]);
  visited[0][0] = true;

  while (queue.length) {
    const [x, y, count] = queue.shift();

    if (x === n - 1 && y === m - 1) return count;

    for (const direction of directions) {
      const [nx, ny] = [x + direction[0], y + direction[1]];

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < n &&
        ny < m &&
        maps[nx][ny] &&
        !visited[nx][ny]
      ) {
        queue.push([nx, ny, count + 1]);
        visited[nx][ny] = true;
      }
    }
  }

  return -1;
}