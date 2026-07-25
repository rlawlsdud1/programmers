function solution(n, times) {
    let answer = Infinity
    
    let left = 0
    let right = Math.max(...times) * n
    
    while(left <= right){
        const mid = Math.floor((left + right) / 2)
        
        let sum = 0
        times.forEach((t) => {
            // 주어진 시간동안 해당 심사대에서 몇 명 처리할 수 있는지
            sum += Math.floor(mid / t)
        })
        
        if(sum >= n){
            answer = Math.min(answer, mid)
            right = mid - 1
        }else{
            left = mid + 1
        }
    }
    
    return answer;
}