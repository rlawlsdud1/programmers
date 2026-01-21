function solution(maps) {
  maps = maps.map((v) => {
    return v.split("").map((e) => (isNaN(Number(e)) ? e : Number(e)));
  });

  const answer = [];
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  const [n, m] = [maps.length, maps[0].length];
  const visited = Array.from({ length: n }, () =>
    Array.from({ length: m }).fill(false),
  );

  function DFS(x, y) {
    let sum = maps[x][y];

    for (const direction of directions) {
      const [nx, ny] = [x + direction[0], y + direction[1]];

      if (nx >= 0 && ny >= 0 && nx < n && ny < m) {
        if (!visited[nx][ny] && maps[nx][ny] !== "X") {
          visited[nx][ny] = true;
          sum += DFS(nx, ny);
        }
      }
    }

    return sum;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (maps[i][j] !== "X" && !visited[i][j]) {
        visited[i][j] = true;
        const sum = DFS(i, j);
        answer.push(sum);
      }
    }
  }

  if (!answer.length) return [-1];
  return answer.sort((a, b) => a - b);
}