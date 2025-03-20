function solution(n, computers) {
    let count = 0
    
    function DFS(node){
        for(let i=0; i<n; i++){
            // 방문 안했고 node와 연결돼있다면
            if(!visited[i] && computers[node][i]){
                visited[i] = true
                DFS(i)
            }
        }    
    }
    
    const visited = Array.from({length : n}).fill(false)
    for(let i=0; i<n; i++){
        if(!visited[i]){
            visited[i] = true
            DFS(i)
            count++
        }
    }
    
    return count
}