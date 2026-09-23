function solution(begin, target, words) {
    if(!words.find((v) => v === target)) return 0
    
    function can_change(word1, word2) {
        let count = 0
        const word1_to_arr = word1.split('')
        const word2_to_arr = word2.split('')
        
        for(let i = 0; i < word1.length; i++){
            if(word1_to_arr[i] !== word2_to_arr[i]) count++
            
            if(count > 1) return false
        }
        
        return count === 0 ? false : true
    }
    
    const graph = {}
    
    for(let i = 0; i < words.length - 1; i++){
        for(let j = i + 1; j < words.length; j++){
            const word1 = words[i]
            const word2 = words[j]
            
            if(can_change(word1, word2)) {
                graph[word1] ? graph[word1].push(word2) : graph[word1] = [word2]
                graph[word2] ? graph[word2].push(word1) : graph[word2] = [word1]
            }
        }
    }
    
    words.forEach((v) => {
        const word = v
        
        if(can_change(word, begin)) {
            graph[word] ? graph[word].push(begin) : graph[word] = [begin]
            graph[begin] ? graph[begin].push(word) : graph[begin] = [word]
        }
    })
    
    const queue = []
    queue.push([begin, 0])
    
    const visited = new Set()
    visited.add(begin)
    
    while(queue.length) {
        const [word, count] = queue.shift()
        
        if(word == target) return count
        
        for(const nextWord of graph[word] || []) {
            if(!visited.has(nextWord)) {
                visited.add(nextWord)
                queue.push([nextWord, count + 1])
            }
        }
    }

    return 0
}