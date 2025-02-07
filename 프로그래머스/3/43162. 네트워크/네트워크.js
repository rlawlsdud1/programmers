function solution(n, computers) {
    // DFS
    // 한쪽으로 쭉 뚫고, 방문 안한거 있으면 또 한쪽으로 쭉 뚫고
    // 반복하다가 다 방문했다면, answer return
    let answer = 0;
    
    const visited = Array.from({length:n}).fill(false)
    
    function DFS(node){
        for(let i=0; i<n; i++){
            if(!visited[i] && computers[node][i]){
                visited[i] = true
                DFS(i)
            }
        }
    }
    
    for(let i=0; i<n; i++){
        if(!visited[i]){
            DFS(i)
            answer++
        }
    }
    
    return answer;
}