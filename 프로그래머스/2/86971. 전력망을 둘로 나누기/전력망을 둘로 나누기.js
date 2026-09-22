function solution(n, wires) {
    let answer = Infinity
    
    // 2차원 배열로 하는 게 훨씬 효율적일 듯
    const graph = {}
    
    wires.forEach((v) => {
        const [a, b] = v
        graph[a] ? graph[a].push(b) : graph[a] = [b]
        graph[b] ? graph[b].push(a) : graph[b] = [a]
    })
    
    function DFS(node, graph, visited) {
        let count = 1
        
        for(const adjacantNode of graph[node]){
            if(!visited.has(adjacantNode)){
                visited.add(adjacantNode)
                count += DFS(adjacantNode, graph, visited)
            }
        }
        
        return count
    }
    
    wires.forEach((v) => {
        const [a, b] = v
        const copied_graph = JSON.parse(JSON.stringify(graph))
        copied_graph[a] = copied_graph[a].filter((v) => v !== b)
        copied_graph[b] = copied_graph[b].filter((v) => v !== a)
        
        const visited = new Set()
        visited.add(1)
        const count = DFS(1, copied_graph, visited)
        answer = Math.min(Math.abs(n - 2 * count), answer)
    })
    
    return answer;
}