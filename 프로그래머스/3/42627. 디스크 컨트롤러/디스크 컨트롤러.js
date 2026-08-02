class Heap{
    constructor(compare){
        this.heap = []
        this.compare = compare
    }
    
    size(){
        return this.heap.length
    }
    
    peek(){
        return this.heap[0]
    }
    
    push(value){
        const heap = this.heap
        heap.push(value)
        
        let idx = heap.length - 1
        
        while(idx > 0){
            const parent = Math.floor((idx - 1) / 2)
            
            if(this.compare(heap[parent], heap[idx]) <= 0) break
            
            [heap[parent], heap[idx]] = [heap[idx], heap[parent]]
            
            idx = parent
        }
    }
    
    pop(){
        const heap = this.heap
        
        if(heap.length === 0) return undefined
        if(heap.length === 1) return heap.pop()
        
        const top = heap[0]
        heap[0] = heap.pop()
        
        let idx = 0
        while(1){
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

function solution(jobs) {
    jobs.sort((a, b) => a[0] - b[0])
    
    const compare = (a, b) => {
        if(a[0] !== b[0]) return a[0] - b[0]
        if(a[1] !== b[1]) return a[1] - b[1]
        return a[2] - b[2]
    }
    
    const pq = new Heap(compare)
    const n = jobs.length
    let count = 0 // 하드 디스크에서 수행된 작업 수
    let total = 0 // 누적 반환 시간
    let time = 0 // 현재 시각
    let pointer = 0
    
    while(count < n){
        while(pointer < n && time >= jobs[pointer][0]){
            const [request, duration] = jobs[pointer]
        
            pq.push([duration, request, pointer])
            pointer++
        }
        
        if(pq.size() > 0){
            const [duration, request, _] = pq.pop()
            time += duration
            total += time - request
            count++
        }else time = jobs[pointer][0]
            
        
    }
    
    return Math.floor(total / n)
    
}