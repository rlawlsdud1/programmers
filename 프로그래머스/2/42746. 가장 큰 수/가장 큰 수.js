function solution(numbers) {
  numbers.sort((a, b) =>
    String(b).repeat(4).localeCompare(String(a).repeat(4))
  );
  return String(BigInt(numbers.join("")));
}