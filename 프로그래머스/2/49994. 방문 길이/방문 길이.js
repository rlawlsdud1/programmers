function solution(dirs) {
  var answer = 0;
  const visited = [];
  let x = 0,
    y = 0;
  for (let i = 0; i < dirs.length; i++) {
    if (dirs[i] === "U") {
      const nx = x;
      const ny = y + 1;
      if (isValid(nx, ny)) {
        if (!isVisited(x, y, nx, ny)) {
          visited.push([x, y, nx, ny]);
          visited.push([nx, ny, x, y]);
          y++;
          answer++;
        } else {
          y++;
        }
      }
    } else if (dirs[i] === "D") {
      const nx = x;
      const ny = y - 1;
      if (isValid(nx, ny)) {
        if (!isVisited(x, y, nx, ny)) {
          visited.push([x, y, nx, ny]);
          visited.push([nx, ny, x, y]);
          y--;
          answer++;
        } else {
          y--;
        }
      }
    } else if (dirs[i] === "R") {
      const nx = x + 1;
      const ny = y;
      if (isValid(nx, ny)) {
        if (!isVisited(x, y, nx, ny)) {
          visited.push([x, y, nx, ny]);
          visited.push([nx, ny, x, y]);
          x++;
          answer++;
        } else {
          x++;
        }
      }
    } else {
      const nx = x - 1;
      const ny = y;
      if (isValid(nx, ny)) {
        if (!isVisited(x, y, nx, ny)) {
          visited.push([x, y, nx, ny]);
          visited.push([nx, ny, x, y]);
          x--;
          answer++;
        } else {
          x--;
        }
      }
    }
  }

  function isValid(x, y) {
    if (x <= 5 && y <= 5 && x >= -5 && y >= -5) {
      return true;
    }
    return false;
  }

  function isVisited(x, y, nx, ny) {
    for (let i = 0; i < visited.length; i++) {
      if (
        visited[i][0] == x &&
        visited[i][1] == y &&
        visited[i][2] == nx &&
        visited[i][3] == ny
      ) {
        return true;
      }
    }

    return false;
  }
  return answer;
}