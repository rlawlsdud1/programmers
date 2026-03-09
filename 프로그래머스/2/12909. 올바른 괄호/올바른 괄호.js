function solution(s) {
  const check_stack = [];

  for (let i = 0; i < s.length; i++) {
    const cur = s[i];

    if (check_stack.at(-1) === "(") {
      if (cur === ")") {
        check_stack.pop();
      } else check_stack.push(cur);
    } else check_stack.push(cur);
  }

  return check_stack.length === 0 ? true : false;
}