function solution(cost, hint) {
    let answer = Infinity
    
    const n = cost.length
    const hint_info = Array.from({length: n + 1}).fill(1)
    
    function BT(round, hint_info, cumulative_cost){
        
        if(round === n + 1){
            answer = Math.min(answer, cumulative_cost)
            return
        }
        
        const current_stage_hint_count = hint_info[round]
        
        // 해당 스테이지에서 힌트 번들을 사는 경우
        const copied_hint = [...hint_info]
            
        if(round !== n){
            for(let j = 1; j < hint[round - 1].length; j++){
                const hint_num = hint[round - 1][j]
            
                copied_hint[hint_num]++
            }
            
            BT(round + 1, copied_hint, cumulative_cost + hint[round - 1][0] + cost[round - 1][Math.min(n, current_stage_hint_count) - 1])
        }
            
           
        
        // 해당 스테이지에서 힌트 번들을 안 사는 경우
        BT(round + 1, hint_info, cumulative_cost + cost[round - 1][Math.min(n, current_stage_hint_count) - 1])        

    }
    
    BT(1, hint_info, 0)
    
    return answer;
}