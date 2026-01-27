function solution(m, n, board) {
  let answer = 0;

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
  ]; // 시계 방향 체크용 방향 배열

  board = board.map((v) => v.split(""));

  function checkErased(x, y, board) {
    const type = board[x][y];
    let [nx, ny] = [x, y];
    const erasedCandidates = [`${x},${y}`];

    for (const dir of directions) {
      [nx, ny] = [nx + dir[0], ny + dir[1]];

      if (nx >= 0 && ny >= 0 && nx < m && ny < n) {
        if (board[nx][ny] === type) {
          erasedCandidates.push(`${nx},${ny}`);
        } else return false;
      } else return false;
    }

    return erasedCandidates;
  }

  while (1) {
    const erasedBlocks = new Set();

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] !== "X") {
          const result = checkErased(i, j, board);

          if (result) {
            result.forEach((v) => {
              erasedBlocks.add(v);
            });
          }
        }
      }
    }

    answer += erasedBlocks.size;

    erasedBlocks.forEach((v) => {
      const [x, y] = v.split(",");
      board[x][y] = "X";
    });

    if (!erasedBlocks.size) break;

    const newBoard = Array.from({ length: m }, () =>
      Array.from({ length: n }).fill("X"),
    );

    for (let j = 0; j < n; j++) {
      const column = [];

      for (let i = m - 1; i >= 0; i--) {
        if (board[i][j] !== "X") {
          column.push(board[i][j]);
        }
      }

      let count = 0;
      while (count < column.length) {
        newBoard[m - count - 1][j] = column[count];
        count++;
      }
    }

    board = newBoard;
  }

  return answer;
}