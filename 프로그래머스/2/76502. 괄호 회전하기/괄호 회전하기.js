function solution(s) {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    const rotatedS = [...s.split("").slice(i), ...s.split("").slice(0, i)];
    const stack = [];
    for (let j = 0; j < rotatedS.length; j++) {
      if (stack.at(-1) === "[") {
        rotatedS[j] === "]" ? stack.pop() : stack.push(rotatedS[j]);
      } else if (stack.at(-1) === "{") {
        rotatedS[j] === "}" ? stack.pop() : stack.push(rotatedS[j]);
      } else if (stack.at(-1) === "(") {
        rotatedS[j] === ")" ? stack.pop() : stack.push(rotatedS[j]);
      } else {
        stack.push(rotatedS[j]);
      }
    }
    if (!stack.length) {
      count++;
    }
  }
  return count;
}