function solution(distance, rocks, n) {
    let left = 0
    let right = distance
    rocks.sort((a,b) => a-b)
    rocks.unshift(0)    
    rocks.push(distance)
    
    while(left <= right){
        const mid = Math.floor((left + right) / 2)    
        
        let prev = 0
        let count = 0
        for(let i=1; i<rocks.length; i++){
            if(rocks[i] - rocks[prev] < mid){
                count++
            }else{
                prev = i
            }
        }
        
        if(count > n){
            right = mid - 1
        }else{
            left = mid + 1
        }
    }
    return right
}