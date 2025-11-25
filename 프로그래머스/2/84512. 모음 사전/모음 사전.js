function solution(word) {
  const everyWordsSet = new Set();
  const vowel = ["A", "E", "I", "O", "U"];

  function BT(str) {
    if (str.length === 5) {
      everyWordsSet.add(str);
      return;
    }

    for (let i = 0; i < 5; i++) {
      str += vowel[i];
      everyWordsSet.add(str);
      BT(str);
      str = str.slice(0, -1);
    }
  }

  BT("");

  const everyWordsArr = [...everyWordsSet];
  everyWordsArr.sort();

  return everyWordsArr.findIndex((v) => v === word) + 1;
}