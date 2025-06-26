function solution(rectangle, characterX, characterY, itemX, itemY) {
  // 테두리만 길로 쓸 수 있다
  // 길인 곳을 덮으면 제거한다
  // 길이 아닌곳을 덮으려 할 때는 길로 포함 안한다

  const directions = [
    [0.5, 0],
    [-0.5, 0],
    [0, 0.5],
    [0, -0.5],
  ];

  const path = new Set();
  const restrictedPath = new Set();

  rectangle.forEach((r) => {
    makeCoordinates(r, path, restrictedPath);
  });

  const queue = [[characterX, characterY, 0]];
  const visited = new Set();

  while (queue.length) {
    const [x, y, count] = queue.shift();

    if (x === itemX && y === itemY) {
      return Math.floor(count / 2);
    }

    for (const direction of directions) {
      const [nx, ny] = [x + direction[0], y + direction[1]];
      const newCoordinate = `${nx},${ny}`;

      if (
        !visited.has(newCoordinate) &&
        !restrictedPath.has(newCoordinate) &&
        path.has(newCoordinate)
      ) {
        visited.add(newCoordinate);
        queue.push([nx, ny, count + 1]);
      }
    }
  }
}

function makeCoordinates(rectangle, path, restrictedPath) {
  const [x1, y1, x2, y2] = rectangle;

  for (let i = x1; i <= x2; i += 0.5) {
    for (let j = y1; j <= y2; j += 0.5) {
      const coordinate = `${i},${j}`;
      // 테두리인 경우
      if (i === x1 || i === x2 || j === y1 || j === y2) {
        if (!restrictedPath.has(coordinate)) {
          path.add(coordinate);
        }
      } else {
        if (path.has(coordinate)) {
          path.delete(coordinate);
        }
        restrictedPath.add(coordinate);
      }
    }
  }
}

console.log(
  solution(
    [
      [1, 1, 7, 4],
      [3, 2, 5, 5],
      [4, 3, 6, 9],
      [2, 6, 8, 8],
    ],
    1,
    3,
    7,
    8
  )
);
