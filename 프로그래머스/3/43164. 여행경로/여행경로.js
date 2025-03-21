function solution(tickets) {
    tickets.sort()
    
    const visited = Array.from({length : tickets.length}).fill(false)
    const answer = []
    
    function DFS(start, path){
        if(path.length === tickets.length+1){
            answer.push([...path])
            return    
        }
        
        for(let i=0; i<tickets.length; i++){
            if(!visited[i] && tickets[i][0] === start){
                path.push(tickets[i][1])
                visited[i] = true
                
                DFS(tickets[i][1], path)
                path.pop()
                visited[i] = false
            }
        }
    }
    
    DFS('ICN', ['ICN'])
    
    return answer[0]
}

// 조건 확인하며 완탐
// 가능한 경로가 여러개면 알파벳 순서가 앞서는 경로를 return하라고 했으므로
// 주어진 tickets를 사전순으로 정렬해놓고 시작하면
// 원하는 값을 return할 수 있을 듯 하다.