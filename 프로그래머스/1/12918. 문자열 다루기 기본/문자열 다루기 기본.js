function solution(s) {
  if (s.includes("e")) {
    return false;
  }
  if (s === "0000" || s === "000000" || (fourOrsix(s) && isNum(s))) {
    return true;
  }

  return false;
}

function fourOrsix(s) {
  if (s.length === 4 || s.length === 6) {
    return true;
  }
  return false;
}

function isNum(s) {
  if (Number(s)) {
    return true;
  }
  return false;
}