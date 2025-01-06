function solution(nums) {
  var answer = 0;
  const numsToSet = new Set(nums);
  const canGet = nums.length / 2;
  if (numsToSet.size >= canGet) {
    return canGet;
  }
  return numsToSet.size;
}