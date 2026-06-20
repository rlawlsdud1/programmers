function solution(message, spoiler_ranges) {
  let answer = 0;
  const temp_sentence_arr = message.split("");

  spoiler_ranges.forEach((v) => {
    const [start, end] = v;

    for (let i = start; i <= end; i++) {
      if (message[i] !== " ") temp_sentence_arr[i] = "*";
    }
  });

  const temp_sentence_str = temp_sentence_arr.join("");
  const splitted_msg = message.split(" ");
  const splitted_temp_msg = temp_sentence_str.split(" ");

  const count_of_word_table = {};
  splitted_msg.forEach((v) => {
    count_of_word_table[v]
      ? (count_of_word_table[v] += 1)
      : (count_of_word_table[v] = 1);
  });

  const count_of_word = splitted_msg.length;
  for (let i = 0; i < count_of_word; i++) {
    const [word, post_processing_word] = [
      splitted_msg[i],
      splitted_temp_msg[i],
    ];

    if (post_processing_word.includes("*")) {
      count_of_word_table[word] -= 1;
    }
  }

  Object.values(count_of_word_table).forEach((v) => {
    if (v === 0) answer++;
  });

  return answer;
}