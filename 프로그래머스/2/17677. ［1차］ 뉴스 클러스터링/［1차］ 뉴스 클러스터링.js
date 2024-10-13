function solution(str1, str2) {
  function isAlpha(str) {
    return /^[a-zA-Z]+$/.test(str);
  }
  let set1 = [];
  let set2 = [];
  for (let i = 0; i < str1.length - 1; i++) {
    if (isAlpha(str1[i] + str1[i + 1])) {
      set1.push((str1[i] + str1[i + 1]).toLowerCase());
    }
  }
  for (let i = 0; i < str2.length - 1; i++) {
    if (isAlpha(str2[i] + str2[i + 1])) {
      set2.push((str2[i] + str2[i + 1]).toLowerCase());
    }
  }
  console.log(set1, set2);
  const unionSet = new Set([...set1, ...set2]);
  const intersectionSet = new Set(
    [...set1].filter((element) => set2.includes(element))
  );
  const unionSetToArray = Array.from(unionSet);
  const intersectionSetToArray = Array.from(intersectionSet);
  console.log(unionSet, intersectionSet);
  let intersection = 0;
  let union = 0;
  if (set1.length && set2.length) {
    for (let i = 0; i < intersectionSetToArray.length; i++) {
      const count1 = set1.filter((e) => e === intersectionSetToArray[i]).length;
      const count2 = set2.filter((e) => e === intersectionSetToArray[i]).length;
      intersection += Math.min(count1, count2);
    }
    for (let i = 0; i < unionSetToArray.length; i++) {
      const count1 = set1.filter((e) => e === unionSetToArray[i]).length;
      const count2 = set2.filter((e) => e === unionSetToArray[i]).length;
      union += Math.max(count1, count2);
    }
    return Math.trunc((intersection / union) * 65536);
  } else if (!set1.length && !set2.length) {
    return 65536;
  } else {
    return 0;
  }
}