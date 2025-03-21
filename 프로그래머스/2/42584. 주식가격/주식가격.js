function solution(prices) {
    const answer = Array.from({length : prices.length}).fill(0)
    const stack = []
    for(let i=0; i<prices.length; i++){
        while(prices[stack.at(-1)] > prices[i]){
            const decreasingIdx = stack.pop()
            answer[decreasingIdx] = i - decreasingIdx
        }
        stack.push(i)
    }
    stack.forEach((v) => {
        answer[v] = prices.length - v - 1
    })
    
    return answer
}
//