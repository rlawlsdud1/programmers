function solution(n) {
    const dp = Array(n + 1).fill(0);
    let a = 1;
    let b = 2;
    let answer
    
    for (let i = 3; i <= n; i++) {
        const c = (a + b) % 1_000_000_007
        
        a = b
        b = c
        
        if(i === n) answer = c
    }
    return answer
}
