function solution(board) {
    function slip(x, y, board, dir, n, m){
        while(1) {
            const nx = x + dir[0]
            const ny = y + dir[1]
            
            if(nx >= 0 && ny >= 0 && nx < n && ny < m && board[nx][ny] !== 'D') {
                x = nx
                y = ny
            } else break
        }
        
        return [x, y]
    }
    
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    
    const [n, m] = [board.length, board[0].length]
    
    let startX, startY
    let endX, endY
    
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            if(board[i][j] === 'R') [startX, startY] = [i, j]
            if(board[i][j] === 'G') [endX, endY] = [i, j]
        }
    }
    
    const queue = []
    queue.push([startX, startY, 0])
    
    const visited = Array.from({length : n}, () => Array.from({length : m}).fill(false))
    visited[startX][startY] = true
    
    while(queue.length) {
        const [x, y, count] = queue.shift()
        
        if(x === endX && y === endY) return count
        
        for(const direction of directions) {
            const [nx, ny] = slip(x, y, board, direction, n, m)
            
            if(!visited[nx][ny]) {
                visited[nx][ny] = true
                queue.push([nx, ny, count + 1])
            }
        }
    }
    
    return -1
}