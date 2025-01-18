function solution(park, routes) {
  const directions = {
    E: [0, 1],
    W: [0, -1],
    S: [1, 0],
    N: [-1, 0],
  };

  let [x, y] = [0, 0];
  for (let i = 0; park.length; i++) {
    if (!park[i].includes("S")) {
      x++;
    } else {
      const splitedStr = park[i].split("");
      y = splitedStr.findIndex((v) => v === "S");
      break;
    }
  }

  for (let i = 0; i < routes.length; i++) {
    const [direction, distance] = routes[i].split(" ");
    let canMove = true;

    let [nx, ny] = [x, y];

    for (let j = 0; j < Number(distance); j++) {
      nx += directions[direction][0];
      ny += directions[direction][1];
      console.log(nx, ny);
      if (
        nx < 0 ||
        ny < 0 ||
        nx >= park.length ||
        ny >= park[0].length ||
        park[nx][ny] === "X"
      ) {
        canMove = false;
        break;
      }
    }

    if (canMove) {
      x = nx;
      y = ny;
    }
  }

  console.log(x, y);
  return [x, y];
}