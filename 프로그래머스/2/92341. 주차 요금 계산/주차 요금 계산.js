function solution(fees, records) {
  const answerInfo = {};
  const carInfo = {};

  records.forEach((record) => {
    const [timeInfo, carNum, _] = record.split(" ");

    if (carInfo[carNum]) {
      answerInfo[carNum]
        ? (answerInfo[carNum] += caculateTime(carInfo[carNum], timeInfo))
        : (answerInfo[carNum] = caculateTime(carInfo[carNum], timeInfo));

      delete carInfo[carNum];
    } else {
      carInfo[carNum] = timeInfo;
    }
  });

  const remainCar = Object.keys(carInfo);
  remainCar.forEach((car) => {
    answerInfo[car]
      ? (answerInfo[car] += caculateTime(carInfo[car], "23:59"))
      : (answerInfo[car] = caculateTime(carInfo[car], "23:59"));
  });

  const answer = [];
  Object.entries(answerInfo).forEach((v) => {
    const [carNum, totalTime] = v;

    answer.push([carNum, caculateFee(fees, totalTime)]);
  });
  answer.sort((a, b) => a[0] - b[0]);

  return answer.map((v) => v[1]);
}

function caculateFee(fees, total) {
  const [time, fee, unitTime, unitFee] = fees;

  if (total <= time) return fee;

  return fee + Math.ceil((total - time) / unitTime) * unitFee;
}

function caculateTime(inTime, outTime) {
  const [inH, inM] = inTime.split(":").map(Number);
  const [outH, outM] = outTime.split(":").map(Number);

  const total = outH * 60 + outM - (inH * 60 + inM);

  return total;
}