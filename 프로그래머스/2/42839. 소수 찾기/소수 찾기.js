function solution(numbers) {
  numbers = numbers.split("");
  const visited = Array.from({ length: numbers.length }).fill(false);
  const setOfNum = new Set();

  function dfs(number) {
    for (let i = 0; i < numbers.length; i++) {
      if (!visited[i]) {
        visited[i] = true;
        dfs(number + numbers[i]);
        setOfNum.add(Number(number + numbers[i]));
        visited[i] = false;
      }
    }
  }

  dfs(0);

  let answer = 0;
  const numArr = [...setOfNum];
  // console.log(numArr);
  numArr.forEach((v) => {
    if (isPrime(v)) answer++;
  });
  return answer;
}

function isPrime(number) {
  if ([0, 1].includes(number)) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}