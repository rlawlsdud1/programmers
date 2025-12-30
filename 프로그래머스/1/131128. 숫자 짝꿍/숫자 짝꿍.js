function solution(X, Y) {
  const countOfX = Array(10).fill(0);
  const countOfY = Array(10).fill(0);

  for (let i = 0; i < X.length; i++) {
    const cur = X[i];
    countOfX[cur]++;
  }

  for (let i = 0; i < Y.length; i++) {
    const cur = Y[i];
    countOfY[cur]++;
  }

  let answer = "";
  for (let i = 9; i >= 0; i--) {
    const count = Math.min(countOfX[i], countOfY[i]);
    answer += String(i).repeat(count);
  }

  if (!answer.length) return "-1";
  if (!Number(answer)) return "0";
  return String(answer);
}