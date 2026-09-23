function solution(N, road, K) {
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
                if(best === idx) break
                
                [heap[best], heap[idx]] = [heap[idx], heap[best]]
                
                idx = best
            }
            
            return top
        }
    }
    
    const graph = {}
    road.forEach((v) => {
        const [a, b, w] = v
        
        graph[a] ? graph[a].push([b, w]) : graph[a] = [[b, w]]
        graph[b] ? graph[b].push([a, w]) : graph[b] = [[a, w]]
    })
    
    const heap = new Heap((a, b) => a[1] - b[1])
    heap.push([1, 0])
    const dist = Array.from({length : N + 1}).fill(Infinity)
    dist[1] = 0
    
    while(heap.size() > 0) {
        const [node, cost] = heap.pop()
        
        if(dist[node] < cost) continue
        
        for(const [adjacantNode, weight] of graph[node]) {
            const nextCost = cost + weight
            
            if(nextCost < dist[adjacantNode]) {
                heap.push([adjacantNode, nextCost])
                dist[adjacantNode] = nextCost
            }
        }
    }
    
    return dist.filter((v) => v <= K).length
    
}