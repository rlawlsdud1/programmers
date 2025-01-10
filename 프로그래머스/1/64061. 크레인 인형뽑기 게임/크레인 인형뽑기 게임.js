function solution(board, moves) {
  let result = 0;
  const box = [];

  // moves에 따라 크레인을 작동
  for (const col of moves) {
    for (let row = 0; row < board.length; row++) {
      const val = board[row][col - 1];
      if (val !== 0) {
        box.push(val);
        board[row][col - 1] = 0;
        break; // 한 번 꺼낸 후에는 다음 move로 이동
      }
    }
  }
  console.log(box);

  // box에서 터지는 로직 구현
  let i = 0;
  while (i < box.length - 1) {
    if (box[i] === box[i + 1]) {
      box.splice(i, 2); // i와 i+1 삭제
      result += 2;
      i = Math.max(0, i - 1); // 이전 인덱스로 돌아가서 다시 검사
    } else {
      i++;
    }
  }

  return result;
}
