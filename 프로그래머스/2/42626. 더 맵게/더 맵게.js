class minHeap{
    constructor(){
        this.heap = []
    }
    
    push(value){
        const heap = this.heap
        heap.push(value)
        
        let idx = heap.length - 1
        while(idx > 0){
            const parent = Math.floor((idx - 1) / 2)
            
            if(heap[parent] <= heap[idx]) break
            
            [heap[parent], heap[idx]] = [heap[idx], heap[parent]]
            
            idx = parent
        }
    }
    
    pop(){
        const heap = this.heap
        
        if(heap.length === 0) return undefined
        if(heap.length === 1) return heap.pop()
        
        const min = heap[0]
        heap[0] = heap.pop()
        
        let idx = 0
        
        while(1){
            let smallest = idx
            const left = idx * 2 + 1
            const right = idx * 2 + 2
            
            if(left < heap.length && heap[left] < heap[smallest]) smallest = left
            if(right < heap.length && heap[right] < heap[smallest]) smallest = right
            
            if(smallest === idx) break
            
            [heap[smallest], heap[idx]] = [heap[idx], heap[smallest]]
            idx = smallest
        }
        
        return min
    }
    
    size(){
        return this.heap.length
    }
    
    
}


function solution(scoville, K) {
    let answer = 0;
    const pq = new minHeap()
    
    scoville.forEach((v) => {
        pq.push(v)
    })
    
    console.log(pq.heap[0])
    
    while(pq.heap[0] < K){
        const first = pq.pop()
        const second = pq.pop()
        
        pq.push(first + second * 2)
        answer++
    }
    
    if(pq.heap[0] >= K) return answer
    return -1
}