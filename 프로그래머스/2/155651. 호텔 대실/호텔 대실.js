function solution(book_time) {
  book_time.sort((a, b) => getTime(a)[0] - getTime(b)[0]);

  const rooms = [];

  book_time.forEach((v) => {
    const [start, end] = getTime(v);

    let [minEndTime, roomNum] = [Infinity, undefined];

    rooms.forEach((room, i) => {
      const curEndTime = room.at(-1);

      if (curEndTime <= start && minEndTime > curEndTime) {
        minEndTime = curEndTime;
        roomNum = i;
      }
    });

    if (roomNum === undefined) rooms.push([end]);
    else rooms[roomNum].push(end);
  });

  return rooms.length;
}

function getTime(bookTime) {
  const [start, end] = bookTime;

  const splitedStart = start.split(":").map(Number);
  const splitedEnd = end.split(":").map(Number);

  const parsedStart = splitedStart[0] * 60 + splitedStart[1];
  const parsedEnd = splitedEnd[0] * 60 + splitedEnd[1] + 10;

  return [parsedStart, parsedEnd];
}