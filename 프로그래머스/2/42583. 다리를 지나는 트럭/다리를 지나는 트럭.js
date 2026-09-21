function solution(bridge_length, weight, truck_weights) {
    let answer = 0;
    
    class Queue {
        constructor() {
            this.queue = []
            this.head = 0
        }
        
        size() {
            return this.queue.length - this.head
        }
        
        push(value) {
            this.queue.push(value)
        }
        
        pop() {
            if(this.size() === 0) return undefined
            return this.queue[this.head++]
        }
        
        peek() {
            return this.queue[this.head]
        }
    }
    
    const queue = new Queue()
    for(let i = 0; i < bridge_length; i++){
        queue.push(0)
    }
    
    let total_weight = 0 // 다리 위에 있는 트럭 무게 합
    let total_count = 0 // 다리 위에 있는 트럭 수
    let pointer = 0 // 대기 트럭 인덱스
    let exit_count = 0
    
    while(exit_count < truck_weights.length) {
        const peek = queue.pop()
            
        if(peek){
            total_weight -= peek
            total_count--    
            exit_count++
        }
        if(total_weight + truck_weights[pointer] <= weight) {
           if(total_count + 1 <= bridge_length) {
                total_weight += truck_weights[pointer]
                queue.push(truck_weights[pointer++])
                total_count++   
           }
        } else { 
            queue.push(0)
        }
        
        answer++
    }
    
    
    return answer;
}