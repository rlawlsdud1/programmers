function compare(a, b){
    if(a[0] !== b[0]) return a[0] - b[0]
    if(a[1] !== b[1]) return a[1] - b[1]
    return a[2] - b[2]
}

class Heap{
    constructor(){
        this.heap = []
    }
    
    push(value){
        const heap = this.heap
        heap.push(value)
        
        let idx = heap.length - 1
        while(idx > 0){
            const parent = Math.floor((idx - 1) / 2)
            
            if(compare(heap[parent], heap[idx]) < 0) break
            
            [heap[parent], heap[idx]] = [heap[idx], heap[parent]]
            
            idx = parent
            
        }
    }
    
    pop(){
        const heap = this.heap
        
        if(heap.length === 0) return undefined
        if(heap.length === 1) return heap.pop()
        
        const higherPriority = heap[0]
        heap[0] = heap.pop()
        
        let idx = 0
        while(1){
            let highestPriority = idx
            const left = idx * 2 + 1
            const right = idx * 2 + 2
            
            if(left < heap.length && compare(heap[left], heap[highestPriority]) < 0) highestPriority = left
            if(right < heap.length && compare(heap[right], heap[highestPriority]) < 0) highestPriority = right
            
            if(highestPriority === idx) break
            
            [heap[highestPriority], heap[idx]] = [heap[idx], heap[highestPriority]]
            
            idx = highestPriority
        }
        
        return higherPriority
    }
    
    size(){
        return this.heap.length
    }
    
    peek(){
        return this.heap[0]
    }
}

function solution(jobs) {
    const pq = new Heap()
    const n = jobs.length
    jobs.sort((a, b) => a[0] - b[0]) // 작업 요청 시간 순으로 오름차순 정렬
    
    let total = 0
    let time = 0 // 현재 시각
    let idx = 0 // jobs 의 pointer
    let count = 0 // 완료된 작업 수
    
    while(count < n){
        // 현 시점에서 pq에 넣을 수 있다면 넣기
        while(idx < n && jobs[idx][0] <= time){
            const [request, duration] = jobs[idx]
            
            pq.push([duration, request, idx])
            idx++
        }
        
        if(pq.size() > 0){
            const [duration, request, _] = pq.pop()
            total += time + duration - request
            
            time += duration // 하드 디스크에서 작업을 바로 마쳐버리는 순간으로 점프시킴
            count++
        }else time = jobs[idx][0]
    }
    
    
    return Math.floor(total / n);
}