function solution(arr) {
  var answer = 0;
  arr.sort((a, b) => a - b);
  let n = arr.at(-1);
  while (!IsModuloZero(arr, n)) {
    n++;
  }
  return n;
}

function IsModuloZero(arr, n) {
  for (let i = 0; i < arr.length; i++) {
    if (n % arr[i] !== 0) {
      return false;
    }
  }
  return true;
}