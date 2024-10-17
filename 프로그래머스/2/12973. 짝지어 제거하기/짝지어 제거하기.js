// stack에 담자
function solution(s) {
  const stack = [];
  s.split("").forEach((e) => {
    if (stack.at(-1) === e) {
      stack.pop();
    } else {
      stack.push(e);
    }
  });
  if (stack.length === 0) {
    return 1;
  }
  return 0;
}