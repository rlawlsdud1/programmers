function solution(distance, rocks, n) {
    let left = 0;
    let right = distance;
    rocks.sort((a, b) => a - b); // 돌을 오름차순으로 정렬
    rocks.unshift(0); // 시작점 추가
    rocks.push(distance); // 끝점 추가
    let answer = 0;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        let count = 0; // 제거한 돌의 개수
        let prev = 0; // 이전 돌의 위치

        for (let i = 1; i < rocks.length; i++) {
            // 현재 돌과 이전 돌 사이의 거리
            const gap = rocks[i] - rocks[prev];
            if (gap < mid) {
                // 거리가 mid보다 작으면 돌을 제거
                count++;
            } else {
                // 거리가 mid보다 크면 이전 돌을 현재 돌로 업데이트
                prev = i;
            }
        }

        if (count <= n) {
            // 제거한 돌의 개수가 n개 이하라면, 더 큰 최소 거리를 시도
            left = mid + 1;
            answer = mid; // 현재 mid를 정답 후보로 저장
        } else {
            // 제거한 돌의 개수가 n개를 초과하면, 더 작은 최소 거리를 시도
            right = mid - 1;
        }
    }

    return answer;
}