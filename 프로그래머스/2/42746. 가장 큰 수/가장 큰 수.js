function solution(numbers) {
    numbers.sort((a, b) => {
        return String(b).repeat(4).slice(0,4) - String(a).repeat(4).slice(0,4) 
    })
    
    return String(BigInt(numbers.join('')))
}
// numbers의 원소는 최대 네자리
