function solution(sequence, k) {
    let [answerX, answerY] = [0, 0]
    let targetLength = Infinity
    let sum = sequence[0]
    let left = 0, right = 0
    
    while(right < sequence.length){
        if(sum === k){
            if(targetLength > right - left){
                answerX = left
                answerY = right
                targetLength = right - left
            }
            sum += sequence[++right]
        }else if(sum > k){
            sum -= sequence[left++]
        }else{
            sum += sequence[++right]
        }
    }
    
    return [answerX, answerY]
}