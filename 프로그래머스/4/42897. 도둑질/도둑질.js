function solution(money) {
    const dp1 = Array.from({length:money.length}).fill(0)
    dp1[0] = money[0]
    
    // 두번째 집은 못텀
    dp1[1] = money[0]
    
    // dp1 경우에는 첫번째 집 털었다고 가정했으므로, 마지막 집은 못텀. 
    // 이에 따라 range 설정
    for(let i=2; i<money.length-1; i++){
        dp1[i] = Math.max(dp1[i-2] + money[i], dp1[i-1])
    }
    
    const dp2 = Array.from({length:money.length}).fill(0)
    dp2[1] = money[1]
    for(let i=2; i<money.length; i++){
        dp2[i] = Math.max(dp2[i-2] + money[i], dp2[i-1])
    }
    return Math.max(dp2[money.length-1], dp1[money.length-2])
}

// 마지막과 끝이 연결돼있기 때문에, 한 번의 순회로 안된다.
// 첫번째 집에서 시작해서, 마지막을 안터는 케이스 dp1
// 첫번째 집에서 시작 안하고, 마지막을 터는 케이스 dp2