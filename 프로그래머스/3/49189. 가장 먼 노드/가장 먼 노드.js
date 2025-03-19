function solution(n, edge) {
    const adjacantList = Array.from({length : n + 1}, () => [])
    edge.forEach((v) => {
        const [a, b] = v
        adjacantList[a].push(b)
        adjacantList[b].push(a)
    })
    
    const distances = Array.from({length : n + 1}).fill(0)
    const visited = Array.from({length : n + 1}).fill(false)
    const queue = []
    queue.push([1, 0])
    visited[1] = true
    
    while(queue.length){
        const [node, distance] = queue.shift()
        distances[node] = distance
        
        for(const adjacantNode of adjacantList[node]){
            if(!visited[adjacantNode]){
                visited[adjacantNode] = true
                queue.push([adjacantNode, distance + 1])
            }
        }
    }
    const maxDistance = Math.max(...distances)
    
    return distances.filter((v) => v === maxDistance).length
}