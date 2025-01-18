function solution(id_list, report, k) {
  const answer = [];

  const userReport = {}; // 신고자 기준
  const reportedObj = {}; // 신고 당한 사람 기준

  for (let i = 0; i < id_list.length; i++) {
    userReport[id_list[i]] = [];
    reportedObj[id_list[i]] = [];
  }

  for (let i = 0; i < report.length; i++) {
    const [user, reporter] = report[i].split(" ");

    if (!userReport[user].includes(reporter)) {
      userReport[user].push(reporter);
    }
    if (!reportedObj[reporter].includes(user)) {
      reportedObj[reporter].push(user);
    }
  }

  const reported = [];
  for (let i = 0; i < Object.entries(reportedObj).length; i++) {
    const [key, value] = Object.entries(reportedObj)[i];
    if (value.length >= k) {
      reported.push(key);
    }
  }

  for (let i = 0; i < Object.values(userReport).length; i++) {
    const value = Object.values(userReport)[i];

    let count = 0;

    for (let j = 0; j < reported.length; j++) {
      if (value.includes(reported[j])) {
        count++;
      }
    }

    answer.push(count);
  }

  return answer;
}