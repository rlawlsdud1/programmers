// moves.length 만큼 반복
// 만약 n번으로 크레인이 이동한다면 board의 각 원소의 n번째 원소(index는 n-1)를 돌아가면서 체크
// 처음으로 0이 아닌 원소가 나온다면 해당 원소를 바구니에 넣고(push)
// 해당 원소를 0 으로 바꾸기
// 바구니에 넣을 때 바구니(stack)의 맨 윗 요소가 넣는 거랑 같다면
// 맨 윗 요소를 바구니에서 빼고(pop) count를 2증가 시킨다.

function solution(board, moves) {
  let stack = [];
  let count = 0;
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    for (let j = 0; j < board.length; j++) {
      if (board[j][move - 1]) {
        if (!stack.length || stack.at(-1) !== board[j][move - 1]) {
          stack.push(board[j][move - 1]);
          board[j][move - 1] = 0;
        } else if (stack.at(-1) === board[j][move - 1]) {
          board[j][move - 1] = 0;
          stack.pop();
          count = count + 2;
        }
        break;
      }
    }
  }
  return count;
}