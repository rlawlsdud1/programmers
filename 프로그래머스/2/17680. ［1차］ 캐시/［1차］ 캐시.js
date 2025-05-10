function solution(cacheSize, cities) {
    let answer = 0;
    const cacheMap = new Map()
    if(cacheSize === 0){
        return cities.length * 5
    }else{
        for(const citi of cities){
            const parsedCiti = citi.toLowerCase()
            if(cacheSize <= cacheMap.size){
                if(cacheMap.has(parsedCiti)){
                    cacheMap.delete(parsedCiti)     
                    answer += 1
                    cacheMap.set(parsedCiti,1)     
                }else{
                    answer += 5
                    const firstKey = cacheMap.keys().next().value;
                    cacheMap.delete(firstKey);
                    cacheMap.set(parsedCiti,1)
                }      
            }else{
                if(cacheMap.has(parsedCiti)){
                    cacheMap.delete(parsedCiti)     
                    answer += 1
                    cacheMap.set(parsedCiti,1)     
                }else{
                    answer += 5
                    cacheMap.set(parsedCiti,1)   
                }   
            }
        }
    }
    
    return answer;
}