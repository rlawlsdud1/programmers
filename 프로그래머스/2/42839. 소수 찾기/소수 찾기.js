function solution(numbers) {
  const visited = Array.from({ length: numbers.length }).fill(false);
  const candidate = [];

  function DFS(path) {
    const joinedPath = Number([...path].join(""));
    if (path.length && !candidate.includes(joinedPath) && joinedPath) {
      candidate.push(joinedPath);
    }

    for (let i = 0; i < numbers.length; i++) {
      if (!visited[i]) {
        visited[i] = true;
        path.push(numbers[i]);
        DFS(path);

        visited[i] = false;
        path.pop();
      }
    }
  }

  DFS([]);
  let answer = 0;
  candidate.forEach((v) => {
    if (checkPrimary(v)) {
      answer++;
    }
  });

  return answer;
}

function checkPrimary(num) {
  if (num === 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}