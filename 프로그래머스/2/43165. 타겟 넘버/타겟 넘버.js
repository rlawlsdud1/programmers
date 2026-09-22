function solution(numbers, target) {
    let answer = 0;
    
    const n = numbers.length
    
    function BT(num, idx) {
        if(idx === n) {
            if(num === target) answer++
            return
        }
        
        BT(num + numbers[idx], idx + 1)
        BT(num - numbers[idx], idx + 1)
    }
    
    BT(0, 0)
    
    return answer;
}