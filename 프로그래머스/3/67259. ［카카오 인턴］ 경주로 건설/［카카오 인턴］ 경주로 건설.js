function solution(board) {
    class Heap {
        constructor(compare) {
            this.heap = []
            this.compare = compare
        }
        
        size() {
            return this.heap.length
        }
        
        push(value) {
            const heap = this.heap
            heap.push(value)
            
            let idx = heap.length - 1
            while(idx > 0) {
                const parent = Math.floor((idx - 1) / 2)
                if(this.compare(heap[parent], heap[idx]) <= 0) break
                [heap[parent], heap[idx]] = [heap[idx], heap[parent]]
                idx = parent
            }
        }
        
        pop() {
            const heap = this.heap
            
            if(heap.length === 0) return undefined
            if(heap.length === 1) return heap.pop()
            
            const top = heap[0]
            heap[0] = heap.pop()
            
            let idx = 0
            while(1) {
                let best = idx
                const left = 2 * idx + 1
                const right = 2 * idx + 2
                
                if(left < heap.length && this.compare(heap[left], heap[best]) < 0) best = left
                if(right < heap.length && this.compare(heap[right], heap[best]) < 0) best = right
                
                if(idx === best) break
                
                [heap[best], heap[idx]] = [heap[idx], heap[best]]
                
                idx = best
            }
            
            return top
        }
    }
    
    const directions = {
        1 : [0, 1],
        2 : [1, 0],
        3 : [0, -1],
        4 : [-1, 0]
    }
    
    const n = board.length
    
    const pq = new Heap((a, b) => a[2] - b[2])
    
    // [x, y, cost, dir]
    pq.push([0, 0, 0, 1])
    pq.push([0, 0, 0, 2])
    
    const costs = Array.from({length : n}, () => Array.from({length : n}, () => Array.from({length : 5}).fill(Infinity)))
    costs[0][0][1] = 0
    costs[0][0][2] = 0
    costs[0][0][3] = 0
    costs[0][0][4] = 0
    
    while(pq.size() > 0) {
        const [x, y, cost, dir] = pq.pop()
        
        for(let direction = 1; direction <= 4; direction++) {
            const [dx, dy] = [directions[direction][0], directions[direction][1]]
            
            const [nx, ny] = [x + dx, y + dy]
            
            if(Math.abs(dir - direction) !== 2 && nx >= 0 && ny >= 0 && nx < n && ny < n && board[nx][ny] === 0) {
                let nextCost
                
                if(Math.abs(dir - direction) % 2 === 1) nextCost = cost + 600
                else nextCost = cost + 100
                
                if(nextCost < costs[nx][ny][direction]) {
                    pq.push([nx, ny, nextCost, direction])
                    costs[nx][ny][direction] = nextCost
                }
            }
        }
    }
    
    return Math.min(...costs[n - 1][n - 1])
}