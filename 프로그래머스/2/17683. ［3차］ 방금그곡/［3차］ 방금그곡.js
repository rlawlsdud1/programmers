function solution(m, musicinfos) {
  let answer = "";
  let curplayTime = 0;
  let curStartTime = Infinity;
  const mToArr = [];

  for (let j = 0; j < m.length; j++) {
    if (m[j] !== "#") {
      if (m[j + 1]) {
        if (m[j + 1] === "#") {
          mToArr.push([m[j], m[j + 1]].join(""));
          j++;
        } else {
          mToArr.push(m[j]);
        }
      } else {
        mToArr.push(m[j]);
      }
    }
  }

  let mToArrToStr = mToArr.join(",");
  mToArrToStr = "," + mToArrToStr + ",";

  for (let i = 0; i < musicinfos.length; i++) {
    let [start, end, title, info] = musicinfos[i].split(",");

    const playTime = getPlayTime(start, end); // 재생된 시간

    const infoToArr = [];
    for (let j = 0; j < info.length; j++) {
      if (info[j] !== "#") {
        if (info[j + 1]) {
          if (info[j + 1] === "#") {
            infoToArr.push([info[j], info[j + 1]].join(""));
            j++;
          } else {
            infoToArr.push(info[j]);
          }
        } else {
          infoToArr.push(info[j]);
        }
      }
    }

    const soundCnt = infoToArr.length; // 해당 곡의 음의 개수
    const totallyPlayedCnt = Math.floor(playTime / soundCnt); // 온전히 재생된 횟수
    let playedInfo = []; // 주어진 시간동안 재생된 정보
    for (let j = 0; j < totallyPlayedCnt; j++) {
      playedInfo = [...playedInfo, ...infoToArr];
    }

    if (totallyPlayedCnt >= 1)
      playedInfo = [...playedInfo, ...infoToArr.slice(0, playTime % soundCnt)];
    else playedInfo = infoToArr.slice(0, playTime % soundCnt);

    playedInfo.unshift(",");
    playedInfo.push(",");
    const playedInfoToStr = playedInfo.join(",");

    if (playedInfoToStr.includes(mToArrToStr)) {
      if (curplayTime < playTime) {
        answer = title;
        curplayTime = playTime;
        curStartTime = getStartTime(start);
      } else if (curplayTime === playTime) {
        if (getStartTime(start) < curStartTime) {
          answer = title;
          curplayTime = playTime;
          curStartTime = getStartTime(start);
        }
      }
    }
  }

  if (answer.length) return answer;
  return "(None)";
}

function getStartTime(start) {
  const [startH, startM] = start.split(":").map(Number);

  return startH * 60 + startM;
}

function getPlayTime(start, end) {
  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  return endH * 60 + endM - (startH * 60 + startM);
}
