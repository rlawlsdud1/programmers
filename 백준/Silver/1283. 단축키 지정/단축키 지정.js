const fs = require("fs");
const path = require("path");
const filePath =
  process.platform === "linux"
    ? "/dev/stdin"
    : path.join(__dirname, "../input.txt");
const input = fs
  .readFileSync(filePath)
  .toString()
  .split("\n")
  .map((v) => v.trim());

const N = Number(input[0]);
const info = input.slice(1, 1 + N).map((v) => v.split(" "));

const keySet = new Set();
info.forEach((words) => {
  let isPrinted = false;
  let count = 0;
  let parsedWord;
  for (const word of words) {
    if (!keySet.has(word[0].toUpperCase())) {
      keySet.add(word[0].toUpperCase());
      parsedWord = `[${word[0]}]${word.slice(1)}`;
      words[count] = parsedWord;
      console.log(words.join(" "));
      isPrinted = true;
      break;
    }
    count++;
  }

  count = 0;
  let canContinue = false;

  if (!parsedWord) {
    for (const word of words) {
      let index = 0;
      let splitedWord = word.split("");

      for (const alphabet of word) {
        if (!keySet.has(alphabet.toUpperCase())) {
          keySet.add(alphabet.toUpperCase());
          splitedWord[index] = `[${alphabet}]`;
          words[count] = splitedWord.join("");
          console.log(words.join(" "));
          canContinue = true;
          isPrinted = true;
          break;
        }
        index++;
      }

      if (canContinue) break;

      count++;
    }
  }

  if (!isPrinted) console.log(words.join(" "));
});
