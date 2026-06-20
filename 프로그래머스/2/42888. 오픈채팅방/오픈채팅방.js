function solution(record) {
  const temp = [];
  const answer = [];

  const chatting_mapping_table = {
    Enter: "님이 들어왔습니다.",
    Leave: "님이 나갔습니다.",
  };

  const nickName_hash_table = {};

  record.forEach((v) => {
    const [history, id, nickName] = v.split(" ");

    if (history === "Enter") {
      nickName_hash_table[id] = nickName;
      temp.push([id, history]);
    } else if (history === "Leave") {
      temp.push([id, history]);
    } else {
      nickName_hash_table[id] = nickName;
    }
  });

  temp.forEach((v) => {
    const [id, history] = v;
    answer.push(`${nickName_hash_table[id]}${chatting_mapping_table[history]}`);
  });

  return answer;
}