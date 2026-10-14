function solution(n, paths, gates, summits) {
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
    
    const graph = {}
    
    paths.forEach((v) => {
        const [a, b, w] = v
        graph[a] ? graph[a].push([b, w]) : graph[a] = [[b, w]]
        graph[b] ? graph[b].push([a, w]) : graph[b] = [[a, w]]
    })
    
    const summit_set = new Set(summits)
    let candidate = []
    let intensity = Infinity
    
    const time = Array.from({length : n + 1}).fill(Infinity)
    const pq = new Heap((a, b) => a[1] - b[1])
    
    gates.forEach((start) => {
        time[start] = 0
        pq.push([start, 0])
    })
    
    while(pq.size() > 0) {
        const [node, cost] = pq.pop()
            
        if(cost > time[node]) continue
        if(summit_set.has(node)) continue // 정상 도착했다면 버림
            
        for(const [next, weight] of graph[node]) {
            const nextCost = Math.max(cost, weight)
                
            if(nextCost < time[next]) {
                time[next] = nextCost
                pq.push([next, nextCost])
            }
        }
    }
        
    // 다익스트라 돌리고 summits 순회하면서 최솟값 갱신
    summits.forEach((summit) => {
        if(time[summit] < intensity) {
            candidate = [summit]
            intensity = time[summit]
        } else if (time[summit] === intensity) candidate.push(summit)
    })
    
    candidate.sort((a, b) => a - b)
    
    return [candidate[0], intensity]
}

