function solution(n, results) {
    let answer = 0;
    
    const winner_graph = Array.from({length : n + 1}, () => [])
    const loser_graph = Array.from({length : n + 1}, () => [])
    
    results.forEach((v) => {
        const [x, y] = v
        
        winner_graph[x].push(y)
        loser_graph[y].push(x)
    })

    function DFS(start, visited, graph){
        let count = 1
        
        for(const adjacantNode of graph[start]){
            if(!visited[adjacantNode]){
                visited[adjacantNode] = true
                count += DFS(adjacantNode, visited, graph)
            }
        }
        
        return count
    }
    
    for(let i = 1; i <= n; i++){
        const visited_of_winner = Array.from({length : n + 1})
        const visited_of_loser = Array.from({length : n + 1})
        
        const count = DFS(i, visited_of_winner, winner_graph) + DFS(i, visited_of_loser, loser_graph)
        if(count == n + 1) {
            answer++
        }
            
    }
    
    
    return answer;
}