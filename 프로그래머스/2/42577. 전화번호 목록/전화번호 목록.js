function solution(phone_book) {
  var answer = true;
  // 효율성에서 걸린다.
  // 이중 for문이 문제인데 어떻게 고치면 좋을까
  // phone_book 의 length 는 1이상 1,000,000 이하.
  // for (let i = 0; i < phone_book.length; i++) {
  //   for (let j = 0; j < phone_book.length; j++) {
  //     if (i !== j) {
  //       if (phone_book[j].startsWith(phone_book[i])) {
  //         return false;
  //       }
  //     }
  //   }
  // }
  return !phone_book
    .sort()
    .some((element, index, array) => array[index + 1]?.startsWith(element));
}