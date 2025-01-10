function solution(board, moves) {
  let answer = 0;
  const stack = [];
  for (let i = 0; i < moves.length; i++) {
    const numberToPick = moves[i];

    for (let j = 0; j < board.length; j++) {
      if (board[j][numberToPick - 1]) {
        if (stack.at(-1) === board[j][numberToPick - 1]) {
          stack.pop();
          answer = answer + 2;
        } else {
          stack.push(board[j][numberToPick - 1]);
        }

        board[j][numberToPick - 1] = 0;
        break;
      }
    }
  }
  return answer;
}