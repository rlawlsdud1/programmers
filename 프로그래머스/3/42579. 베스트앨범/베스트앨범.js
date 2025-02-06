function solution(genres, plays) {
  const musicObj = {};
  const playCountObj = {};
  genres.forEach((v, i) => {
    musicObj[v]
      ? musicObj[v].push([plays[i], i])
      : (musicObj[v] = [[plays[i], i]]);
    playCountObj[v]
      ? (playCountObj[v] += plays[i])
      : (playCountObj[v] = plays[i]);
  });
  const playCountArr = Object.entries(playCountObj);
  playCountArr.sort((a, b) => b[1] - a[1]);

  const answer = [];
  playCountArr.forEach((v) => {
    const [genre, _] = v;
    musicObj[genre].sort((a, b) => b[0] - a[0]);
    if (musicObj[genre].length > 1) {
      answer.push(musicObj[genre][0][1]);
      answer.push(musicObj[genre][1][1]);
    } else {
      answer.push(musicObj[genre][0][1]);
    }
  });

  return answer;
}