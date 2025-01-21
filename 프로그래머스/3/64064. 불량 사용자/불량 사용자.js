function solution(user_id, banned_id) {
  const possibleCombi = [];
  const candidateSet = new Set();
  for (let i = 0; i < banned_id.length; i++) {
    const candidate = [];

    for (let j = 0; j < user_id.length; j++) {
      if (checkLengthEqual(banned_id[i], user_id[j])) {
        candidate.push(user_id[j]);
      }
    }
    const possibleCandidate = [];
    for (let k = 0; k < candidate.length; k++) {
      if (checkBannedUser(banned_id[i], candidate[k])) {
        possibleCandidate.push(candidate[k]);
        candidateSet.add(candidate[k]);
      }
    }
    possibleCombi.push(possibleCandidate);
  }
  const candidateArr = [...candidateSet];

  const answer = [];
  function DFS(count, path) {
    if (count === possibleCombi.length) {
      if (new Set([...path]).size === possibleCombi.length) {
        if (!answer.length) {
          answer.push([...path]);
        } else if (!checkSameSet([...answer], [...path])) {
          answer.push([...path]);
        }
      }
      return;
    }

    for (let i = 0; i < possibleCombi[count].length; i++) {
      path.push(possibleCombi[count][i]);

      DFS(count + 1, path);

      path.pop();
    }
  }
  DFS(0, []);
  return answer.length;
}

function checkLengthEqual(str1, str2) {
  return str1.length === str2.length;
}

function checkBannedUser(ban, user) {
  for (let i = 0; i < ban.length; i++) {
    if (ban[i] !== user[i]) {
      if (ban[i] !== "*") {
        return false;
      }
    }
  }
  return true;
}

function checkSameSet(answer, arr) {
  for (let i = 0; i < answer.length; i++) {
    const set = new Set(answer[i]);
    for (const item of arr) {
      set.add(item);
    }
    if (set.size === arr.length) {
      return true;
    }
  }
  return false;
}