function solution(today, terms, privacies) {
  const answer = [];
  const [year, month, day] = today.split(".").map(Number);

  const termsMap = {};
  terms.forEach((term) => {
    const [type, range] = term.split(" ");
    termsMap[type] = Number(range);
  });

  privacies.forEach((privacy, i) => {
    const [dayInfo, type] = privacy.split(" ");
    getDifference(year, month, day, dayInfo);
    termsMap[type] * 28;

    if (termsMap[type] * 28 - getDifference(year, month, day, dayInfo) <= 0) {
      answer.push(i + 1);
    }
  });

  return answer;
}

function getDifference(year, month, day, target) {
  const [targetYear, targetMonth, targetDay] = target.split(".").map(Number);

  const todayTotal = (year - 1) * 28 * 12 + (month - 1) * 28 + day;
  const targetTotal =
    (targetYear - 1) * 28 * 12 + (targetMonth - 1) * 28 + targetDay;

  return todayTotal - targetTotal;
}