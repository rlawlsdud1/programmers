function solution(numbers) {
  numbers = numbers.map(String);
  numbers.sort((a, b) => b.repeat(4).localeCompare(a.repeat(4)));
  return String(BigInt(numbers.join("")));
}