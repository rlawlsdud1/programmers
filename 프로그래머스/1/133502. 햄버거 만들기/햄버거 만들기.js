function solution(ingredient) {
  var answer = 0;
  let temp = [];
  for (let i = 0; i < ingredient.length; i++) {
    temp.push(ingredient[i]);
    if (canMake(temp.slice(-4))) {
      answer++;
      temp.splice(-4);
    }
  }
  return answer;
}

function canMake(arr) {
  if (arr[0] == 1 && arr[1] == 2 && arr[2] == 3 && arr[3] == 1) {
    return true;
  }
  return false;
}