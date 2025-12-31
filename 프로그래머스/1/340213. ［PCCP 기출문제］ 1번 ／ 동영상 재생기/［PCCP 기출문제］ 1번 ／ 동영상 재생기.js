function convertTime(time) {
  const [m, s] = time.split(":").map(Number);

  return m * 60 + s;
}

function checkOpeningRange(cur, op_start, op_end) {
  op_start = convertTime(op_start);

  if (op_start <= cur && cur <= op_end) return true;
  return false;
}

function solution(video_len, pos, op_start, op_end, commands) {
  const endTime = convertTime(video_len);
  let cur = convertTime(pos);
  op_end = convertTime(op_end);

  if (checkOpeningRange(cur, op_start, op_end)) cur = op_end;

  commands.forEach((c) => {
    if (checkOpeningRange(cur, op_start, op_end)) cur = op_end;

    if (c === "prev") {
      if (cur < 10) cur = 0;
      else cur -= 10;
    } else if (c === "next") {
      if (cur + 10 > endTime) cur = endTime;
      else cur += 10;
    }
  });

  if (checkOpeningRange(cur, op_start, op_end)) cur = op_end;

  let m = Math.floor(cur / 60);
  let s = cur - m * 60;

  if (m < 10) m = `0${m}`;
  if (s < 10) s = `0${s}`;

  return `${m}:${s}`;
}