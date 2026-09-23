function solution(n, computers) {
    let answer = 0;
    
    const graph = {}
    
    for(let i = 0; i < n; i++){
        for(let j = i + 1; j < n; j++){
            if(computers[i][j]) {
                graph[i] ? graph[i].push(j) : graph[i] = [j]
                graph[j] ? graph[j].push(i) : graph[j] = [i]
            }
        }
    }
    
    function DFS(node, visited) {
        for(const adjacantNode of graph[node] || []) {
            if(!visited.has(adjacantNode)) {
                visited.add(adjacantNode)
                DFS(adjacantNode, visited)
            }
        }
    }
    const visited = new Set()
    
    for(let i = 0; i < n; i++){
        if(!visited.has(i)) {
            visited.add(i)
            DFS(i, visited)
            answer++
        }
    }
    
    return answer;
}