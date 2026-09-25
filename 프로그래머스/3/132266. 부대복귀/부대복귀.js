function solution(n, roads, sources, destination) {
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
                
                [heap[idx], heap[best]] = [heap[best], heap[idx]]
                
                idx = best
            }
            
            return top
        }
    }
    
    const graph = {}
    
    roads.forEach(([a, b]) => {
        graph[a] ? graph[a].push(b) : graph[a] = [b]
        graph[b] ? graph[b].push(a) : graph[b] = [a]
    })
    
    const dist = Array.from({length : n + 1}).fill(Infinity)
    const pq = new Heap((a, b) => a[1] - b[1])
    
    pq.push([destination, 0])
    dist[destination] = 0
    
    while(pq.size() > 0) {
        const [node, cost] = pq.pop()
        
        if(cost > dist[node]) continue
        
        for(const next of graph[node] || []) {
            const nextCost = cost + 1
            
            if(nextCost < dist[next]) {
                dist[next] = nextCost
                pq.push([next, nextCost])
            }
        }
    }
    
    const result = []
    sources.forEach((v) => {
        if(dist[v] === Infinity) result.push(-1)
        else result.push(dist[v])
    })
    
    return result
}