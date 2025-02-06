function solution(nums) {
  const canTake = nums.length / 2;
  const ponketmonObj = {};
  nums.forEach((v) => {
    ponketmonObj[v] ? (ponketmonObj[v] += 1) : (ponketmonObj[v] = 1);
  });
  return Math.min(canTake, Object.keys(ponketmonObj).length);
}