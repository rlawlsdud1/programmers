function solution(plans) {
  plans.sort((a, b) => convertTime(a[1]) - convertTime(b[1]));
  plans.map((plan) => {
    plan[1] = convertTime(plan[1]);
    plan[2] = Number(plan[2]);
  });

  const answer = []; // 완료한 과제
  let in_progress; // 현재 진행 중인 과제
  let in_progress_start_time; // 현재 진행 중인 과제 시작 시간
  const temp_stack = []; // 멈춰둔 과제

  for (const plan of plans) {
    const start_time = plan[1];

    // 새롭게 시작해야 하는 상황에서 기존에 진행 중인 과제가 있는 경우
    if (in_progress) {
      const elapsed_time = start_time - in_progress_start_time;

      // 기존에 진행 중이던게 이미 끝났었을 경우
      if (elapsed_time >= in_progress[2]) {
        answer.push(in_progress[0]);

        // 여기서 temp_stack에 있는 과제 진행
        let remaining_time = elapsed_time - in_progress[2]; // 기존에 진행 중인거 끝나고 남은 시간

        // 그 남은 시간으로 멈춰둔 과제들 수행
        while (temp_stack.length) {
          const cur_plan = temp_stack.at(-1); // 가장 최근에 멈춘 과제

          if (remaining_time - cur_plan[2] < 0) {
            cur_plan[2] -= remaining_time;

            // 남은 시간으로는 얘까지밖에 못함
            break;
          } else {
            answer.push(cur_plan[0]);
            remaining_time -= cur_plan[2];
            temp_stack.pop();
          }
        }
      } else {
        in_progress[2] -= elapsed_time;
        temp_stack.push(in_progress);
      }
    }

    in_progress = plan;
    in_progress_start_time = start_time;
  }

  answer.push(in_progress[0]);

  return [...answer, ...temp_stack.reverse().map((v) => v[0])];
}

function convertTime(time) {
  const [h, m] = time.split(":").map(Number);

  return h * 60 + m;
}