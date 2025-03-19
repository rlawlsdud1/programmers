function solution(N, number) {
    const dp = Array.from({length : 9}, () => new Set())
    
    for(let i = 1; i <= 8; i++){
        dp[i].add(Number(String(N).repeat(i)))
        for(let j = 1; j < i; j++){
            for(const a of dp[i - j]){
                for(const b of dp[j]){
                    dp[i].add(a * b)
                    dp[i].add(a + b)
                    dp[i].add(a - b)
                    dp[i].add(Math.floor(a / b))
                }
            }
        }
        if(dp[i].has(number)) return i
    }
    
    return -1
}


// 예시 ( N = 5)
// N을 1번 사용하는 경우 ) 5
// N을 2번 사용하는 경우 ) 55, 5와 5의 사칙연산
// N을 3번 사용하는 경우 ) 555, 5와 55의 사칙연산, 55와 5의 사칙연산
// N을 4번 사용하는 경우 ) 5555, 5와 555의 사칙연산, 55와 55의 사칙연산, 555와 5의 사칙연산
// ...