function solution(numbers) {
    function isPrime(n) {
        if (n < 2) return false;
        if (n < 4) return true;
        if (n % 2 === 0) return false;

        for (let i = 3; i * i <= n; i += 2) {
            if (n % i === 0) return false;
        }
        
        return true;
    }

    const numbers_to_arr = numbers.split('')
    let answer = 0;
    const n = numbers.length
    const checked = new Set()
    
    function DFS(num, used) {
        
        if(isPrime(Number(num)) && !checked.has(Number(num))) { 
            answer++
            checked.add(Number(num))
        }
        
        for(let i = 0; i < n; i++) {
            if(!used.has(i)){
                used.add(i)
                DFS(num + numbers_to_arr[i], used)
                used.delete(i)   
            }
        }
    }
    
    for(let i = 0; i < n; i++){
        const used = new Set()
        used.add(i)
        DFS(numbers_to_arr[i], used)
    }
        
    return answer;
}