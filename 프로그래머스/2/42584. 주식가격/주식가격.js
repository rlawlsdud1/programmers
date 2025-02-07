function solution(prices) {
    // loop 2개 돌리면 당연히 답은 나오겠지만, 당연히 시간초과 뜬다.
    const answer = Array.from({length:prices.length}).fill(0)
    const stack = []
    for(let i=0; i<prices.length; i++){
        while(stack.length && prices[stack.at(-1)] > prices[i]){
            const j = stack.pop()
            answer[j] = i - j
        }
        stack.push(i)
    }
    stack.forEach((v) => {
        answer[v] = prices.length - 1 - v
    })
    return answer;
}