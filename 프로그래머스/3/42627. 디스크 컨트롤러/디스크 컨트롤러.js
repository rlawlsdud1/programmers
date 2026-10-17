function solution(jobs) {
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
        
        peek() {
            return this.heap[0]
        }
    }
    
    function compare(a, b) {
        if(a[0] !== b[0]) return a[0] - b[0]
        if(a[1] !== b[1]) return a[1] - b[1]
        return a[2] - b[2]
    }
    
    jobs.sort((a, b) => a[0] - b[0])
    
    const pq = new Heap(compare)
    
    const n = jobs.length
    
    let count = 0
    let total = 0
    let time = 0
    let idx = 0
    
    while(count < n) {
        // 요청 시각이 되면 작업 큐에 넣는다
        while(idx < n && jobs[idx][0] <= time) {
            const [request_time, processing_time] = jobs[idx]
            pq.push([processing_time, request_time, idx])
            idx++
        }
        
        if(pq.size() > 0) {
            const [processing_time, request_time, _] = pq.pop()
            total += time + processing_time - request_time
            time += processing_time
            count++
        } else time = jobs[idx][0]
    }
    
    return Math.floor(total / n)
}