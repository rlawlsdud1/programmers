function solution(answers) {
    const first = [1,2,3,4,5]
    const second = [2,1,2,3,2,4,2,5]
    const third = [3,3,1,1,2,2,4,4,5,5]
    
    let [firstCnt, secondCnt, thirdCnt] = [0, 0, 0]
    answers.forEach((v, i) => {
        if(v === first[i % 5]) firstCnt++
        if(v === second[i % 8]) secondCnt++
        if(v === third[i % 10]) thirdCnt++
    })
    const result = [firstCnt, secondCnt, thirdCnt]
    const maxValue = Math.max(...result)
    const answer = []
    result.forEach((v, i) => {
        if(v === maxValue) answer.push(i+1)
    })
    
    return answer
}