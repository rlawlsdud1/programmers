function solution(number, k) {
    let answer = '';
    let stack = []
    
    for(let i=0; i<number.length; i++){
        while(k > 0 && stack.at(-1) < number[i]){
            stack.pop()
            k--
        }
        stack.push(number[i])
    }
    // 위의 반복문을 돌면 k가 0이 아닐수도 있음
    console.log(k)
    stack = stack.slice(0, number.length - k)
    
    return stack.join("")
}