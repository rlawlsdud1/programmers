function solution(lines) {
  lines = lines.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });

  const numberLine = Array.from({ length: 201 }).fill(0);
  const intersectionList = [];
  intersectionList.push(getIntersection(lines[0], lines[1]));
  intersectionList.push(getIntersection(lines[0], lines[2]));
  intersectionList.push(getIntersection(lines[1], lines[2]));
  intersectionList.forEach((v) => {
    if (v) {
      for (let i = v[0]; i < v[1]; i++) {
        numberLine[100 + i] += 1;
      }
    }
  });

  return numberLine.filter((v) => v >= 1).length;
}

// 무조건 겹치는 구간만을 return
function getIntersection(line1, line2) {
  if (line2[0] < line1[1]) {
    if (line1[1] < line2[1]) {
      return [line2[0], line1[1]];
    } else {
      return [line2[0], line2[1]];
    }
  }
}