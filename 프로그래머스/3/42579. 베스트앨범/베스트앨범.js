function solution(genres, plays) {
  const answer = [];
  const hashedGenres = {};
  const genreForPlay = {};
  for (let i = 0; i < genres.length; i++) {
    if (hashedGenres[genres[i]]) {
      hashedGenres[genres[i]] += plays[i];
      genreForPlay[genres[i]].push([i, plays[i]]);
      genreForPlay[genres[i]].sort((a, b) => {
        // 두 번째 원소를 기준으로 비교
        if (a[1] === b[1]) {
          // 같으면 첫 번째 원소로 비교
          return a[0] - b[0];
        }
        return b[1] - a[1];
      });
    } else {
      hashedGenres[genres[i]] = plays[i];
      genreForPlay[genres[i]] = [[i, plays[i]]];
      genreForPlay[genres[i]].sort((a, b) => {
        if (a[1] === b[1]) {
          return a[0] - b[0];
        }
        return b[1] - a[1];
      });
    }
  }

  // hashedGenres의 [key, value]가 담긴 배열
  const keysFromHashedGenres = Object.entries(hashedGenres);
  // keysFromHashedGenres의 각 원소에서 두번째 원소를 기준으로 정렬한 배열
  const sortedArr = keysFromHashedGenres.sort((a, b) => b[1] - a[1]);

  // 여기서 index에러가 나는 듯 하다.
  for (let i = 0; i < sortedArr.length; i++) {
    const genreKey = sortedArr[i][0];
    answer.push(genreForPlay[genreKey][0][0]);
    if (genreForPlay[genreKey][1]) {
      answer.push(genreForPlay[genreKey][1][0]);
    }
  }

  return answer;
}