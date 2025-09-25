function solution(queue1, queue2) {
  let sum1 = queue1.reduce((acc, cur) => acc + cur, 0);
  let sum2 = queue2.reduce((acc, cur) => acc + cur, 0);
  const n = queue1.length;

  if ((sum1 + sum2) % 2 !== 0) return -1;

  const target = (sum1 + sum2) / 2;

  let count = 0;
  const extendedQueue = [...queue1, ...queue2];

  let left = 0,
    right = n - 1;
  let sum = sum1;

  while (count < 4 * n) {
    if (sum > target) {
      sum -= extendedQueue[left % (2 * n)];
      left++;
    } else if (sum === target) {
      return count;
    } else {
      right++;
      sum += extendedQueue[right % (2 * n)];
    }
    count++;
  }

  return -1;
}

console.log(solution([1, 1], [1, 5]));
