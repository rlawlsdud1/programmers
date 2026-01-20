function solution(skill, skill_trees) {
  let answer = 0;

  skill_trees.forEach((skill_tree) => {
    let temp = skill;
    const check_set = new Set(temp[0]);
    temp = temp.slice(1);

    const is_non_relative_skill = new Set(skill.split(""));
    let isPossible = true;

    for (let i = 0; i < skill_tree.length; i++) {
      const cur = skill_tree[i];

      if (!is_non_relative_skill.has(cur)) continue;

      if (check_set.has(cur)) {
        check_set.add(temp[0]);
        temp = temp.slice(1);
      } else {
        isPossible = false;
        break;
      }
    }

    if (isPossible) answer++;
  });

  return answer;
}