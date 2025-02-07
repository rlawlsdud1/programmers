function solution(number, k) {
  const stack = [];
  for (let i = 0; i < number.length; i++) {
    while (k > 0 && stack.at(-1) < number[i]) {
      k--;
      stack.pop();
    }
    stack.push(number[i]);
  }
  if (!k) return stack.join("");
  return stack.slice(0, -k).join("");
}