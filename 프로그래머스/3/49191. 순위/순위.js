function solution(n, results) {
    const winnerAdjacantList = Array.from({length : n+1}, () => [])
    const loserAdjacantList = Array.from({length : n+1}, () => [])
    
    results.forEach((v) => {
        const [a, b] = v
        winnerAdjacantList[a].push(b)
        loserAdjacantList[b].push(a)
    })
    
    function BFS(start, adjacantList){
        const visited = Array.from({length : n + 1}).fill(false)
        const queue = []
        queue.push(start)
        visited[start] = true
        let count = 0
        
        while(queue.length){
            const node = queue.shift()
            for(const adjacantNode of adjacantList[node]){
                if(!visited[adjacantNode]){
                    queue.push(adjacantNode)
                    visited[adjacantNode] = true
                    count++
                }
            }
        }
        return count
    }
    
    let answer = 0
    for(let i = 1; i <= n; i++){
        if(BFS(i, winnerAdjacantList) + BFS(i, loserAdjacantList) === n - 1){
            answer++
        }
    }
    
    return answer
}

