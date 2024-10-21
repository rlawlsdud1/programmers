function solution(a, b) {
  const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const day = {
    1: "FRI",
    2: "SAT",
    3: "SUN",
    4: "MON",
    5: "TUE",
    6: "WED",
    0: "THU",
  };

  function daysOfSum(a, b) {
    let sum = 0;
    for (let i = 0; i < a - 1; i++) {
      sum += days[i];
    }
    return sum + b;
  }

  return day[daysOfSum(a, b) % 7];
}