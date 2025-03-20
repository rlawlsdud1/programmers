function solution(progresses, speeds) {
    const answer = [];
    
    while(progresses.length){
        for(let i = 0; i < progresses.length; i++){
            progresses[i] += speeds[i]
        }    
        let count = 0
        while(progresses[0] >= 100){
            progresses.shift()
            speeds.shift()
            count++
        }
        if(count) answer.push(count)
    }
    
    return answer;
}

// 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포된다
// 각 배포마다 몇 개의 기능이 배포되는지 return