function solution(storage, requests) {
  const [n, m] = [storage.length, storage[0].length];
  storage = storage.map((v) => v.split(""));
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function DFS(x, y, map, visited) {
    for (const direction of directions) {
      const [nx, ny] = [x + direction[0], y + direction[1]];

      if (nx >= 0 && ny >= 0 && nx < n && ny < m) {
        if (map[nx][ny] === "." && !visited[nx][ny]) {
          visited[nx][ny] = true;
          if (DFS(nx, ny, map, visited)) return true;
        }
      } else {
        return true;
      }
    }
  }

  let answer = n * m;

  requests.forEach((r) => {
    const containers = new Set();

    if (r.length === 1) {
      for (let x = 0; x < n; x++) {
        for (let y = 0; y < m; y++) {
          if (storage[x][y] === r) {
            const visited = Array.from({ length: n }, () =>
              Array.from({ length: m }).fill(false)
            );

            if (DFS(x, y, storage, visited)) {
              containers.add(`${x},${y}`);
            }
          }
        }
      }
    } else {
      for (let x = 0; x < n; x++) {
        for (let y = 0; y < m; y++) {
          if (storage[x][y] === r[0]) {
            containers.add(`${x},${y}`);
          }
        }
      }
    }

    containers.forEach((c) => {
      const [x, y] = c.split(",").map(Number);
      storage[x][y] = ".";
      answer--;
    });
  });

  return answer;
}