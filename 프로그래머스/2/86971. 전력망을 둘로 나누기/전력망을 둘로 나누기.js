function solution(n, wires) {
    let answer = Infinity
    const adjacantList = Array.from({length : n+1}, () => [])
    wires.forEach((v) => {
        const [a, b] = v
        adjacantList[a].push(b)
        adjacantList[b].push(a)
    })
    
    function DFS(node, map, visited){
        let count = 1
        visited[node] = true
        
        for(const adjacantNode of map[node]){
            if(!visited[adjacantNode]){
                count += DFS(adjacantNode, map, visited)
            }
        }
        
        return count
    }
    
    wires.forEach((v) => {
        const [a, b] = v
        const copiedMap = JSON.parse(JSON.stringify(adjacantList))
        const visited = Array.from({length : n+1}).fill(false)
        copiedMap[a] = copiedMap[a].filter((v) => v !== b)
        copiedMap[b] = copiedMap[b].filter((v) => v !== a)
        
        const cntOfa = DFS(a, copiedMap, visited)
        const cntOfb = DFS(b, copiedMap, visited)
        answer = Math.min(answer, Math.abs(cntOfa - cntOfb))
        
        
        // a에서 출발, b에서 출발
        // 차의 절댓값과 answer 비교
        // 더 작으면 answer 갱신
    })
    return answer
}