function solution(n, times) {
    let right = Math.max(...times) * n
    let left = 0
    
    while(left <= right){
        const mid = Math.floor((left+right)/2)
        let sum = 0
        times.forEach((v) => {
            sum += Math.floor(mid / v)
        })
        
        if(sum >= n){
            right = mid - 1
        }else{
            left = mid + 1
        }
    }
    
    return left
}