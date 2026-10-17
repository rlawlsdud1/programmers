function solution(n, s, a, b, fares) {
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
    
    function dijkstra(graph, dist, start) {
        const pq = new Heap((a, b) => a[1] - b[1])
        pq.push([start, 0])
        
        dist[start] = 0
        
        while(pq.size() > 0) {
            const [node, cost] = pq.pop()
            
            if(cost > dist[node]) continue
            
            for(const [next, weight] of graph[node] || []) {
                const nextCost = cost + weight
                
                if(nextCost < dist[next]) {
                    dist[next] = nextCost
                    pq.push([next, nextCost])
                }
            }
        }
    }
    
    const graph = {}
    fares.forEach((v) => {
        const [a, b, cost] = v
        graph[a] ? graph[a].push([b, cost]) : graph[a] = [[b, cost]]
        graph[b] ? graph[b].push([a, cost]) : graph[b] = [[a, cost]]
    })
    
    const dist_from_start = Array.from({length : n + 1}).fill(Infinity)
    
    dijkstra(graph, dist_from_start, s)
    
    let answer = Infinity
    
    for(let node = 1; node <= n; node++) {
        const dist_from_node = Array.from({length : n + 1}).fill(Infinity)
        dijkstra(graph, dist_from_node, node)
        
        answer = Math.min(answer, dist_from_start[node] + dist_from_node[a] + dist_from_node[b])
    }
    
    return answer
    
}