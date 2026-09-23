function solution(maps) {
    class Queue {
        constructor() {
            this.queue = []
            this.head = 0
        }
        
        size() {
            return this.queue.length - this.head
        }
        
        push(value) {
            this.queue.push(value)
        }
        
        pop() {
            if(this.size() === 0) return undefined
            return this.queue[this.head++]
        }
        
        peek() {
            return this.queue[this.head]
        }
    }
    
    const [n, m] = [maps.length, maps[0].length]
    
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    
    const queue = new Queue()
    
    const visited = Array.from({length : n}, () => Array.from({length : m}, () => [false, false]))
    
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            if(maps[i][j] === 'S') {
                queue.push([i, j, 0, false])
                visited[i][j][0] = true
            }
        }
    }
    
    
    while(queue.size() > 0) {
        const [x, y, count, isOpen] = queue.pop()
        
        if(maps[x][y] === 'E' && isOpen) return count
        
        for(const direction of directions) {
            const [nx, ny] = [x + direction[0], y + direction[1]]
            
            if(nx >= 0 && ny >= 0 && nx < n && ny < m && maps[nx][ny] !== 'X') {
                if(!visited[nx][ny][0] && !isOpen) {
                    visited[nx][ny][0] = true
                    
                    if(maps[nx][ny] === 'L') {
                        queue.push([nx, ny, count + 1, true])
                    }else {
                        queue.push([nx, ny, count + 1, isOpen])
                    }
                }else if(!visited[nx][ny][1] && isOpen) {
                    visited[nx][ny][1] = true
                    queue.push([nx, ny, count + 1, isOpen])
                }
            }
        }
    }
    
    return -1
}