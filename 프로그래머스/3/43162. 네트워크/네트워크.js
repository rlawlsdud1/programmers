function solution(n, computers) {
    let answer = 0
    
    const graph = {}
    
    for(let i = 0; i < n; i++){
        for(let j = i+1; j < n; j++){
            if(computers[i][j] !== 0){
                graph[i+1] ? graph[i+1].push(j+1) : graph[i+1] = [j+1]
                graph[j+1] ? graph[j+1].push(i+1) : graph[j+1] = [i+1]
            }
        }
    }
    
    const visited = Array.from({length : n+1}).fill(false)
    
    function DFS(node, visited){
        graph[node]?.forEach((adjacantNode) => {
            if(!visited[adjacantNode]){
                visited[adjacantNode] = true
                DFS(adjacantNode, visited)
            }
        })
    }
    
    for(let i = 1; i <= n; i++){
        if(!visited[i]){
            answer++
            DFS(i, visited)
        }
    }
    
    return answer
}
