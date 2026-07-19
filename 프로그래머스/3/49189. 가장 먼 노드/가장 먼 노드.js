function solution(n, vertex) {
    let answer = 0;
    
    const graph = {}
    vertex.forEach((v) => {
        const [a, b] = v
        graph[a] ? graph[a].push(b) : graph[a] = [b]
        graph[b] ? graph[b].push(a) : graph[b] = [a]
    })
    
    const visited = Array.from({length : n + 1}).fill(false)
    const queue = []
    queue.push([1, 0])
    visited[1] = true
    
    const lengthArr = Array.from({length : n + 1}).fill(0)
    
    while(queue.length){
        const [node, count] = queue.shift()
        
        graph[node].forEach((v) => {
            if(!visited[v]){
                visited[v] = true
                lengthArr[v] = count
                queue.push([v, count + 1])
            }
        })
    }

    lengthArr.sort((a, b) => b - a)
    const standard = lengthArr[0]
    
    for(let i = 0; i < n; i++){
        if(lengthArr[i] !== standard) break
        answer++
    }
    
    return answer;
}