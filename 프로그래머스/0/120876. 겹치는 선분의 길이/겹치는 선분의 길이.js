function solution(lines) {
  const numberLine = Array.from({ length: 201 }).fill(0);
  lines.forEach((v) => {
    for (let i = v[0]; i < v[1]; i++) {
      numberLine[100 + i] += 1;
    }
  });

  return numberLine.filter((v) => v >= 2).length;
}