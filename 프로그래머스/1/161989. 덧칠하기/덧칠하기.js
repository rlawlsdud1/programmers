function solution(n, m, section) {
  let count = 0;

  while (section.length) {
    const idx = section.findIndex((v) => v >= section[0] + m);
    console.log(idx);
    count++;

    if (idx === -1) {
      return count;
    }

    section = section.slice(idx);
  }
}