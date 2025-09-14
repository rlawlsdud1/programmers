function solution(n, m, x, y, r, c, k) {
  const manhattanDistance = Math.abs(x - r) + Math.abs(y - c);

  if (k < manhattanDistance || (k - manhattanDistance) % 2 !== 0)
    return "impossible";

  let answer;

  const directionsInfo = {
    d: [1, 0],
    l: [0, -1],
    r: [0, 1],
    u: [-1, 0],
  };
  const directions = ["d", "l", "r", "u"];

  function DFS(x, y, count, path) {
    const manhattanDistance = Math.abs(x - (r - 1)) + Math.abs(y - (c - 1));

    if (
      k - count < manhattanDistance ||
      (k - count - manhattanDistance) % 2 !== 0
    )
      return false;

    if (count === k) {
      if (x === r - 1 && y === c - 1) {
        answer = path;
        return true;
      }

      return false;
    }

    for (const direction of directions) {
      const [nx, ny] = [
        x + directionsInfo[direction][0],
        y + directionsInfo[direction][1],
      ];

      if (nx >= 0 && ny >= 0 && nx < n && ny < m && count < k) {
        if (DFS(nx, ny, count + 1, path + direction)) return true;
      }
    }
  }

  DFS(x - 1, y - 1, 0, "");

  return answer;
}