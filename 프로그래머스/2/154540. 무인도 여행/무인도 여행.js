function solution(maps) {
    const answer = [];
    const [n, m] = [maps.length, maps[0].length]
    const visited = Array.from({length : n}, () => Array.from({length : m}).fill(false))
    
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    function DFS(x, y) {
        let cumulative = Number(maps[x][y])
        
        for(const direction of directions){
            const [nx, ny] = [x + direction[0], y + direction[1]]
            if(nx >= 0 && ny >= 0 && nx < n && ny < m){
                if(!visited[nx][ny] && maps[nx][ny] !== 'X'){
                    visited[nx][ny] = true
                    cumulative += DFS(nx, ny)
                }
            }
        }
        
        return cumulative
    }
    
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            if(!visited[i][j] && maps[i][j] !== 'X'){
                visited[i][j] = true
                const result = DFS(i, j, maps[i][j])
                answer.push(result)
            }
        }
    }
    
    return answer.length ? answer.sort((a, b) => a - b) : [-1]
}