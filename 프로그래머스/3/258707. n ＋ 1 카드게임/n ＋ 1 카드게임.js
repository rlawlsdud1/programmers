function solution(coin, cards) {
  const n = cards.length;
  let myCards = cards.slice(0, n / 3);
  cards = cards.slice(n / 3);
  let temp = [];

  let round = 0;

  while (myCards.length) {
    const next = [cards[round * 2], cards[round * 2 + 1]];

    // 일단 넣어두고 필요할 때 쓰자
    temp = temp.concat(next);

    let isPossible;
    // 우선 지금 가지고 있는거에서 낼 수 있는지 체크
    for (let i = 0; i < myCards.length; i++) {
      const CANDIDATE_A = myCards[i];

      for (let j = i + 1; j < myCards.length; j++) {
        const CANDIDATE_B = myCards[j];

        if (CANDIDATE_A + CANDIDATE_B === n + 1) {
          myCards = myCards.filter(
            (v) => ![CANDIDATE_A, CANDIDATE_B].includes(v)
          );
          isPossible = true;
          round++;
          break;
        }
      }

      if (isPossible) break;
    }

    // 지금 가지고 있는거에서 못내면
    if (!isPossible) {
      if (coin >= 2) {
        // 내 카드랑 temp랑 조합해서 가능한지
        for (let i = 0; i < temp.length; i++) {
          const CANDIDATE_A = temp[i];

          for (let j = 0; j < myCards.length; j++) {
            const CANDIDATE_B = myCards[j];

            if (CANDIDATE_A + CANDIDATE_B === n + 1) {
              temp = temp.filter((v) => v !== CANDIDATE_A);
              myCards = myCards.filter((v) => v !== CANDIDATE_B);
              isPossible = true;
              coin--;
              round++;
              break;
            }
          }
          if (isPossible) break;
        }

        if (!isPossible) {
          // 안되면, temp에서 고를 수 있는지
          for (let i = 0; i < temp.length; i++) {
            const CANDIDATE_A = temp[i];

            for (let j = i + 1; j < temp.length; j++) {
              const CANDIDATE_B = temp[j];

              if (CANDIDATE_A + CANDIDATE_B === n + 1) {
                temp = temp.filter(
                  (v) => ![CANDIDATE_A, CANDIDATE_B].includes(v)
                );
                isPossible = true;
                coin -= 2;
                round++;
                break;
              }
            }
            if (isPossible) break;
          }
        }
      } else if (coin === 1) {
        // 코인 1개면 내 카드랑 temp랑 조합해서 가능한지
        for (let i = 0; i < temp.length; i++) {
          const CANDIDATE_A = temp[i];

          for (let j = 0; j < myCards.length; j++) {
            const CANDIDATE_B = myCards[j];

            if (CANDIDATE_A + CANDIDATE_B === n + 1) {
              temp = temp.filter((v) => v !== CANDIDATE_A);
              myCards = myCards.filter((v) => v !== CANDIDATE_B);
              isPossible = true;
              coin--;
              round++;
              break;
            }
          }
          if (isPossible) break;
        }
      } else break;
    }

    if (!isPossible) break;
  }

  return round + 1;
}