function solution(people, limit) {
  let answer = 0;
  people = people.sort((a, b) => b - a);
  let [left, right] = [0, people.length - 1];
  while (left <= right) {
    if (people[left] + people[right] > limit) {
      left++;
      answer++;
    } else {
      left++;
      right--;
      answer++;
    }
  }
  return answer;
}