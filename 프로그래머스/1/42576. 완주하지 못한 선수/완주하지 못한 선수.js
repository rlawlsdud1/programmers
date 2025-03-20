function solution(participant, completion) {
    const participantObj = {}
    const completionObj = {}
    
    participant.forEach((v) => {
        participantObj[v] ? participantObj[v] += 1 : participantObj[v] = 1
    })
    completion.forEach((v) => {
        completionObj[v] ? completionObj[v] += 1 : completionObj[v] = 1
    })
    const keyOfParticipant = Object.keys(participantObj)
    for(let i=0; i<keyOfParticipant.length; i++){
        if(participantObj[keyOfParticipant[i]] > completionObj[keyOfParticipant[i]]){
            return keyOfParticipant[i]
        }else if(!completionObj[keyOfParticipant[i]]){
            return keyOfParticipant[i]
        }
              
    }
}
// 단 한 명의 선수를 제외하고는 모든 선수가 마라톤을 완주
