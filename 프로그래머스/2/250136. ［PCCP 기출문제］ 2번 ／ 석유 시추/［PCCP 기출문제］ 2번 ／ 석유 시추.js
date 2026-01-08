function solution(land) {
  // 매 순간 돌리는게 아니라, 먼저 해당 영역의 크기를 구하기
  const [n, m] = [land.length, land[0].length];
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const groundObj = {}; // 땅 번호 : 땅 크기
  let groundNum = 0;

  function BFS(x, y, land, visited, visitArr) {
    let count = 1;
    const queue = [[x, y]];

    while (queue.length) {
      const [x, y] = queue.shift();

      for (const direction of directions) {
        const [nx, ny] = [x + direction[0], y + direction[1]];

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < n &&
          ny < m &&
          !visited[nx][ny] &&
          land[nx][ny]
        ) {
          count++;
          queue.push([nx, ny]);
          visited[nx][ny] = true;
          visitArr.push([nx, ny]);
        }
      }
    }

    return count;
  }

  const visited = Array.from({ length: n }, () =>
    Array.from({ length: m }).fill(false)
  );

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const visitArr = [];

      if (land[i][j] && !visited[i][j]) {
        groundNum++;
        visited[i][j] = true;
        visitArr.push([i, j]);

        const count = BFS(i, j, land, visited, visitArr);

        visitArr.forEach((v) => {
          const [x, y] = v;

          land[x][y] = groundNum;
          groundObj[groundNum] = count;
        });
      }
    }
  }

  let answer = 0;

  for (let j = 0; j < m; j++) {
    let count = 0;

    const checkGround = new Set();

    for (let i = 0; i < n; i++) {
      const cur = land[i][j];

      if (i === 0) {
        if (cur) {
          count += groundObj[cur];
          checkGround.add(cur);
        }
      } else {
        const prev = land[i - 1][j];

        if (prev !== cur && groundObj[cur] && !checkGround.has(cur)) {
          count += groundObj[cur];
          checkGround.add(cur);
        }
      }
    }

    answer = Math.max(answer, count);
  }

  return answer;
}