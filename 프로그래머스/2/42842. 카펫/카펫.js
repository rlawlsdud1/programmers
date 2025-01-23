function solution(brown, yellow) {
  for (
    let i = Math.ceil((brown + 4) / 4);
    i < Math.floor((brown + 4) / 2);
    i++
  ) {
    if ((Math.floor((brown + 4) / 2) - i) * i === brown + yellow) {
      return [i, Math.floor((brown + 4) / 2) - i];
    }
  }
}