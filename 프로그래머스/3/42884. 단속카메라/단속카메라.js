function solution(routes) {
  routes.sort((a, b) => a[1] - b[1]);

  let y = routes[0][1];
  let answer = 1;

  for (let i = 1; i < routes.length; i++) {
    const [curX, curY] = routes[i];
    if (curX > y) {
      y = curY;
      answer++;
    }
  }

  return answer;
}