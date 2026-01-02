function solution(n, w, num) {
  var answer = 0;
  const columns = Array.from({ length: w }).map((v) => Math.floor(n / w));

  if (Math.floor((n - 1) / w) % 2 === 1) {
    let index = w - 1;
    let count = n % w;
    while (count > 0) {
      columns[index]++;
      count--;
      index--;
    }
  } else {
    let index = 0;
    let count = n % w;
    while (count > 0) {
      columns[index]++;
      count--;
      index++;
    }
  }
  let columnHeight;
  if (Math.floor((num - 1) / w) % 2 === 1)
    columnHeight = columns[w - 1 - ((num - 1) % w)];
  else columnHeight = columns[(num - 1) % w];

  return columnHeight - Math.floor((num - 1) / w);
}