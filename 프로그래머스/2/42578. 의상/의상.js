function solution(clothes) {
  const cloth_table = {};
  const cloth_type = new Set();

  clothes.forEach((v) => {
    const [name, type] = v;
    cloth_table[type]
      ? cloth_table[type].push(name)
      : (cloth_table[type] = [name]);

    cloth_type.add(type);
  });

  let answer = 1;
  cloth_type.forEach((v) => {
    answer *= cloth_table[v].length + 1;
  });

  return answer - 1;
}