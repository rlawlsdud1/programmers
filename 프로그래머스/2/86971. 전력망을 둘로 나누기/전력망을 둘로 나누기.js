function solution(n, wires) {
    let answer = Infinity
    
    const graph = {}
    wires.forEach((v) => {
        const [a, b] = v
        graph[a] ? graph[a].push(b) : graph[a] = [b]
        graph[b] ? graph[b].push(a) : graph[b] = [a]
    })
    
    wires.forEach((v) => {
        const [a, b] = v
        // 간선 하나씩 끊어가면서 DFS 돌리고 각 트리의 노드 수 구하기
        
        graph[a] = graph[a].filter((v) => v !== b)
        graph[b] = graph[b].filter((v) => v !== a)
        
        let [first, second] = [0, 0]
        const visited = Array.from({length : n + 1}).fill(false)
        
        for(let i = 1; i <= n; i++){
            if(!visited[i]){
                visited[i] = true
                const total_count = DFS(i, graph, visited)
                
                if(!first) first = total_count
                else second = total_count
            }
        }

        answer = Math.min(answer, Math.abs(first - second))
        
        // 그래프 원복
        graph[a].push(b)
        graph[b].push(a)
    })
    
    return answer;
}

function DFS(node, graph, visited){
    let count = 1
    
    graph[node].forEach((v) => {
        if(!visited[v]){
            visited[v] = true
            count += DFS(v, graph, visited)
        }
    })
    
    return count
}