function solution(distance, rocks, n) {
    let left = 0, right = distance
    rocks.sort((a, b) => a - b)
    rocks.unshift(0)
    rocks.push(distance)
    
    while(left <= right){
        const mid = Math.floor((left + right) / 2)
        // 최소 mid만큼의 거리를 유지하기 위해서 몇 개의 돌을 제거해야하는지 체크할 것이다.
        
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
            // n개보다 더 많이 제거해야 한다면, 사이 거리를 줄여서 덜 제거하게끔 해야 한다
            right = mid - 1
        }else{
            // n개보다 더 적게 제거 한다면 거리를 늘려서 더 제거하게끔 해야 한다
            left = mid + 1
        }
    }
    
    return right
}