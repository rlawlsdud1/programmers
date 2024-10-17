function solution(food) {
  const answer = [];
  const foodList = [];
  for (let i = 1; i < food.length; i++) {
    if (food[i] >= 2) {
      if (food[i] % 2 === 0) {
        let n = 0;
        while (n < food[i] / 2) {
          foodList.push(i);
          n++;
        }
      } else {
        let n = 0;
        while (n < Math.floor(food[i] / 2)) {
          foodList.push(i);
          n++;
        }
      }
    }
  }
  answer.push(...foodList);
  answer.push(0);
  answer.push(...foodList.reverse());
  return answer.join("");
}