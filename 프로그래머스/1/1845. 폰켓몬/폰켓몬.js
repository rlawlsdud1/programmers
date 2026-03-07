function solution(nums) {
    
  const ponketmon_set = new Set();
  nums.forEach((v) => {
    ponketmon_set.add(v);
  });

  if (ponketmon_set.size >= nums.length / 2) return nums.length / 2;
  return ponketmon_set.size;
}