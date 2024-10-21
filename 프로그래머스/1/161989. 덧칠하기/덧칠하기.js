function solution(n, m, section) {
  let count = 0;
  while (section.length) {
    const idx = section.findIndex((e) => e >= section[0] + m);
    // 이 과정은 불필요한 듯
    // section = section.filter((e) => e >= section[0] + m);
    if (idx === -1) {
      count++;
      break;
    }
    section = section.slice(idx);
    count++;
  }
  return count;
}