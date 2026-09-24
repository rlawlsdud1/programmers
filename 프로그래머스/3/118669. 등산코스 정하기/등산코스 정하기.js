function solution(n, paths, gates, summits) {
    class Heap {
        constructor(compare) {
            this.heap = []
            this.compare= compare
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
    
    const graph = {}
    paths.forEach((v) => {
        const [a, b, w] = v
        graph[a] ? graph[a].push([b, w]) : graph[a] = [[b, w]]
        graph[b] ? graph[b].push([a, w]) : graph[b] = [[a, w]]
    })
    
    const summit_set = new Set(summits)
    
    const intensity = Array.from({length : n + 1}).fill(Infinity) 
    const pq = new Heap((a, b) => a[1] - b[1])
    
    gates.forEach((v) => {
        intensity[v] = 0
        pq.push([v, 0])        
    })
    
    while(pq.size() > 0) {
        const [node, cost] = pq.pop()
        
        if(cost > intensity[node]) continue
        
        if(summit_set.has(node)) continue
        
        for(const [nextNode, nextCost] of graph[node]) {
            const nextIntensity = Math.max(cost, nextCost)
            
            if(nextIntensity < intensity[nextNode]) {
                intensity[nextNode] = nextIntensity
                pq.push([nextNode, nextIntensity])
            }
        }
    }
    
    summits.sort((a, b) => a - b)
    let min_intensity = Infinity
    summits.forEach((v) => {
        min_intensity = Math.min(min_intensity, intensity[v])
    })
    
    const best = summits.find((v) => intensity[v] === min_intensity);
    return [best, min_intensity];
    
    
}