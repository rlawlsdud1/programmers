function solution(k, dungeons) {
    let answer = 0
    
    const n = dungeons.length
    
    function DFS(visited, hp, count) {
        answer = Math.max(answer, count)
        
        for(let i = 0; i < n; i++){
            const [required_hp, cost] = dungeons[i]
            
            if(required_hp <= hp && !visited.has(i)) {
                visited.add(i)
                DFS(visited, hp - cost, count + 1)
                visited.delete(i)
            }
        }
    }
    
    DFS(new Set(), k, 0)
    
    return answer;
}