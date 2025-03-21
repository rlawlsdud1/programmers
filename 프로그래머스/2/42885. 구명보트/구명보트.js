function solution(people, limit) {
    people.sort((a,b) => a-b)
    let left = 0
    let right = people.length - 1
    
    let answer = 0
    while(left <= right){
        if(people[left] + people[right] <= limit){
            answer++
            left++
            right--
        }else{
            answer++
            right--
        }
    }
    
    return answer
}