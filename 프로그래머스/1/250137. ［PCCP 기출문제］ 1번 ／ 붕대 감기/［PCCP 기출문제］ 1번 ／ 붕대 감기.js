function solution(bandage, health, attacks) {
  let hp = health;
  const [duration, recovery, extraRecovery] = bandage;

  const n = attacks.at(-1)[0];
  const attackInfo = {};

  attacks.forEach((v) => {
    const [time, damage] = v;
    attackInfo[time] = damage;
  });

  let continuousSuccess;

  for (let t = 1; t <= n; t++) {
    if (attackInfo[t]) {
      continuousSuccess = 0;
      hp -= attackInfo[t];

      if (hp <= 0) return -1;
    } else {
      continuousSuccess++;

      if (continuousSuccess === duration) {
        continuousSuccess = 0;
        hp = Math.min(health, hp + recovery + extraRecovery);
      } else {
        hp = Math.min(health, hp + recovery);
      }
    }
  }

  return hp;
}