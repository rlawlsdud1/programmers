function solution(n, computers) {
    
    const visited = Array.from({length:n}).fill(false)
    function DFS(node){
        visited[node] = true
        for(let i=0; i<computers[node].length; i++){
            if(!visited[i] && computers[node][i]){
                DFS(i)
            }
        }
    }
    
    let count = 0
    for(let i=0; i<n; i++){
        if(!visited[i]){
            
            DFS(i)
            count++
        }
    }
    return count
}