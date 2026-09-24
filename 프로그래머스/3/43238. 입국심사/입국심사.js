function solution(n, times) {
    let answer = Infinity
    let left = 0
    let right = Math.max(...times) * n
    
    console.log(left, right)
    
    while(left <= right) {
        const mid = Math.floor((left + right) / 2)
        
        let count = 0
        times.forEach((v) => {
            count += Math.floor(mid / v)
        })
        
        if(count >= n) {
            right = mid - 1
            answer = Math.min(answer, mid)
        } else {
            left = mid + 1
        }
        
    }
    
    return answer;
}