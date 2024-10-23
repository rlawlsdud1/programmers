function solution(n, lost, reserve) {
  // 진짜 잃어버린 애들
  const realLost = lost
    .filter((e) => !reserve.includes(e))
    .sort((a, b) => a - b);
  // 진짜 빌려줄 수 있는 애들
  let realReserve = reserve
    .filter((e) => !lost.includes(e))
    .sort((a, b) => a - b);

  let answer = n - realLost.length;

  realLost.forEach((e) => {
    if (realReserve.includes(e - 1)) {
      answer++;
      realReserve = realReserve.filter((student) => student !== e - 1);
    } else if (realReserve.includes(e + 1)) {
      answer++;
      realReserve = realReserve.filter((student) => student !== e + 1);
    }
  });

  return answer;
}