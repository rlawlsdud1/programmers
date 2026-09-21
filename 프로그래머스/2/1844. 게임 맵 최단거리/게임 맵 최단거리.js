function solution(maps) {
    class Queue {
        constructor(){
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
    let answer = 0;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    const [n, m] = [maps.length, maps[0].length] 
    
    const visited = Array.from({length : n}, () => Array.from({length : m}).fill(false))
    const queue = new Queue()
    
    queue.push([0, 0, 1])
    while(queue.size() > 0) {
        const [x, y, count] = queue.pop()
        
        if(x === n - 1 && y === m - 1) return count
        
        for(const direction of directions){
            const [nx, ny] = [x + direction[0], y + direction[1]]
            if(nx >= 0 && ny >= 0 && nx < n && ny < m) {
                if(!visited[nx][ny] && maps[nx][ny]){
                    queue.push([nx, ny, count + 1])
                    visited[nx][ny] = true
                }
            }
        }
        
    }
    
    return -1;
}